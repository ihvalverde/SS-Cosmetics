const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');

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

router.get('/', (req, res) => {
  const { brand, category, search } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (brand) {
    query += ' AND brand = ?';
    params.push(brand);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (search) {
    query += ' AND (name LIKE ? OR brand LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(row);
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const { name, brand, category, price, offer_price, stock } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !brand || !category || !price) {
    return res.status(400).json({ error: 'Nombre, marca, categoría y precio son requeridos' });
  }

  const query = `
    INSERT INTO products (name, brand, category, price, offer_price, stock, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [name, brand, category, price, offer_price || null, stock || 0, image_url], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      name,
      brand,
      category,
      price,
      offer_price,
      stock,
      image_url
    });
  });
});

router.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, brand, category, price, offer_price, stock } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

  let query = `
    UPDATE products
    SET name = ?, brand = ?, category = ?, price = ?, offer_price = ?, stock = ?, updated_at = CURRENT_TIMESTAMP
  `;
  const params = [name, brand, category, price, offer_price || null, stock || 0];

  if (image_url !== undefined) {
    query += ', image_url = ?';
    params.push(image_url);
  }

  query += ' WHERE id = ?';
  params.push(id);

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ id, name, brand, category, price, offer_price, stock, image_url });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  });
});

module.exports = router;