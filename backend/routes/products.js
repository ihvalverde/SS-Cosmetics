const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const pool = require('../database');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(require('path').extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    }
  }
});

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'ss-cosmeticos', resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

router.get('/', async (req, res) => {
  try {
    const { brand, category, search, sort } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let idx = 1;

    if (brand) {
      query += ` AND brand = $${idx++}`;
      params.push(brand);
    }
    if (category) {
      query += ` AND category = $${idx++}`;
      params.push(category);
    }
    if (search) {
      query += ` AND (name ILIKE $${idx} OR brand ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    const sortOptions = {
      'alpha-asc': 'name ASC',
      'alpha-desc': 'name DESC',
      'newest': 'created_at DESC',
      'price-asc': 'price ASC',
      'price-desc': 'price DESC'
    };
    query += ` ORDER BY ${sortOptions[sort] || 'name ASC'}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, category, price, offer_price, stock } = req.body;

    if (!name || !brand || !category || !price) {
      return res.status(400).json({ error: 'Nombre, marca, categoría y precio son requeridos' });
    }

    let image_url = null;
    if (req.file) {
      image_url = await uploadToCloudinary(req.file);
    }

    const result = await pool.query(
      `INSERT INTO products (name, brand, category, price, offer_price, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [name, brand, category, price, offer_price || null, stock || 0, image_url]
    );

    res.status(201).json({
      id: result.rows[0].id,
      name, brand, category, price, offer_price, stock, image_url
    });
  } catch (err) {
    console.error('POST /products error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, category, price, offer_price, stock } = req.body;

    let image_url = undefined;
    if (req.file) {
      image_url = await uploadToCloudinary(req.file);
    }

    let query = `
      UPDATE products
      SET name = $1, brand = $2, category = $3, price = $4, offer_price = $5, stock = $6, updated_at = CURRENT_TIMESTAMP
    `;
    const params = [name, brand, category, price, offer_price || null, stock || 0];
    let idx = 7;

    if (image_url !== undefined) {
      query += `, image_url = $${idx++}`;
      params.push(image_url);
    }

    query += ` WHERE id = $${idx}`;
    params.push(id);

    const result = await pool.query(query, params);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ id, name, brand, category, price, offer_price, stock, image_url });
  } catch (err) {
    console.error('PUT /products error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;