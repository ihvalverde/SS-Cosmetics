const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../database');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const { brand, category, search } = req.query;
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

    query += ' ORDER BY created_at DESC';

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
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !brand || !category || !price) {
      return res.status(400).json({ error: 'Nombre, marca, categoría y precio son requeridos' });
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
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, category, price, offer_price, stock } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

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