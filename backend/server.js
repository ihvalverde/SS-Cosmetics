const express = require('express');
const cors = require('cors');
const path = require('path');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'S&S Cosméticos API funcionando' });
});

const adminPath = path.join(__dirname, '..', 'frontend-admin', 'dist');
const catalogPath = path.join(__dirname, '..', 'frontend', 'dist');

app.use('/admin', express.static(adminPath));
app.use(express.static(catalogPath));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(catalogPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Catálogo: http://localhost:${PORT}/`);
  console.log(`Admin: http://localhost:${PORT}/admin`);
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurado' : 'NO CONFIGURADO'}`);
  console.log(`CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME || 'NO CONFIGURADO'}`);
  console.log(`CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY ? 'Configurado' : 'NO CONFIGURADO'}`);
  console.log(`CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? 'Configurado' : 'NO CONFIGURADO'}`);
});
