<div align="center">

# ✨ S&S Cosméticos y Accesorios ✨

**Tu catálogo de belleza, siempre a un mensaje de distancia.**

[![Deploy en Railway](https://img.shields.io/badge/Deploy-Railway-121212?style=for-the-badge&logo=railway)](https://ss-cosmetics-production.up.railway.app/)
[![PWA Ready](https://img.shields.io/badge/PWA-Instalable-D28CA8?style=for-the-badge&logo=pwa)](https://ss-cosmetics-production.up.railway.app/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Enviar%20Pedido-25D366?style=for-the-badge&logo=whatsapp)](https://wa.me/51922625609)

</div>

---

## 🌸 ¿Qué es S&S?

Una **PWA moderna** para que tus clientes descubran tu catálogo de cosméticos y accesorios de forma elegante, y puedan hacer pedidos directo por **WhatsApp** en un toque.

> *Belleza y estilo, siempre conectados.*

---

## 💄 Marcas Disponibles

| Marca | Categorías |
|-------|------------|
| **Ésika** | Fragancias, Maquillaje, Cuidado Personal, Tratamiento Facial |
| **Cyzone** | Fragancias, Maquillaje, Cuidado Personal |
| **L'Bel** | Fragancias, Maquillaje, Cuidado Personal |
| **Accesorios** | Bijouterie, Moda y Hogar |

---

## 🎨 Paleta de Colores

| Color | HEX | Uso |
|-------|-----|-----|
| Rosa Mauve | `#D28CA8` | Acentos, botones, branding |
| Secundario | `#EAA7C0` | Hover states, gradientes |
| Fondo | `#FFF7F9` | Background general |
| Texto | `#333333` | Texto principal |

---

## 🚀 Funcionalidades

### Catálogo (`/`)
- 🛍️ Grid responsivo con imágenes de Cloudinary
- 🔍 Búsqueda en tiempo real por nombre
- 🏷️ Filtros por marca y categoría
- 📊 Ordenamiento alfabético por defecto
- 📱 Diseño mobile-first

### Panel Admin (`/admin`)
- ➕ Crear productos con fotos (upload directo a Cloudinary)
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos
- 📦 Control de stock (badge "Agotado" automático)
- 🔗 Compartir link del catálogo
- 📊 Dashboard con estadísticas

### WhatsApp Integration
- 💬 Botón flotante en cada producto
- 📲 Envía nombre, precio y marca directamente a +51 922 625 609
- 🎯 Mensaje pre-armado para facilitar el pedido

### PWA
- 📲 Instalable desde el navegador
- ⚡ Funciona sin conexión (básico)
- 🏠 Icono personalizado en el home

---

## 🏗️ Stack Tecnológico

```
┌─────────────────────────────────────────────────┐
│                    FRONTEND                      │
├─────────────────────────────────────────────────┤
│  React 18 + Vite  │  Tailwind CSS 3            │
│  React Router 6   │  PWA (Service Worker)       │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│                    BACKEND                       │
├─────────────────────────────────────────────────┤
│  Node.js + Express  │  PostgreSQL (Railway)     │
│  Multer             │  Cloudinary SDK           │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│                  DEPLOYMENT                     │
├─────────────────────────────────────────────────┤
│  Railway (App)     │  Cloudinary (Imágenes)     │
│  GitHub (CI/CD)    │  Railway PostgreSQL (DB)   │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Desarrollo Local

### Requisitos
- Node.js 18+
- PostgreSQL local o connection string

### 1. Clonar el repositorio

```bash
git clone https://github.com/ihvalverde/SS-Cosmetics.git
cd SS-Cosmetics/ss-cosmeticos
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Servidor en `http://localhost:3001`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend en `http://localhost:5173`

### Variables de entorno

```bash
# Backend (.env o en Railway)
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=nzyee6pz
CLOUDINARY_API_KEY=918224318728459
CLOUDINARY_API_SECRET=wZu4lHS0cuKVDEJMkaawoi6NRu0
```

---

## 📁 Estructura del Proyecto

```
ss-cosmeticos/
├── 📄 package.json              # Scripts para Railway (root)
├── 📁 backend/
│   ├── server.js                # Express + sirve React en producción
│   ├── database.js              # PostgreSQL pool + init schema
│   ├── routes/products.js       # API CRUD + Cloudinary upload
│   └── package.json             # Dependencias backend
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── App.jsx              # Router (Catálogo + Admin)
│   │   ├── 📁 pages/
│   │   │   ├── Catalog.jsx      # Vista cliente
│   │   │   └── Admin.jsx        # Panel administrativo
│   │   └── 📁 components/
│   │       ├── Header.jsx       # Logo + buscador
│   │       ├── FilterBar.jsx    # Filtros + ordenamiento
│   │       ├── ProductCard.jsx  # Tarjeta de producto (catálogo)
│   │       ├── ProductGrid.jsx  # Grid responsivo
│   │       ├── ProductList.jsx  # Lista admin
│   │       └── ProductForm.jsx  # Formulario CRUD
│   ├── 📁 public/
│   │   ├── manifest.json        # PWA manifest
│   │   ├── sw.js                # Service Worker
│   │   └── logo-ss.png          # Logo de la app
│   └── tailwind.config.js       # Configuración Tailwind
└── README.md
```

---

## 🌐 URLs de Producción

| Servicio | URL |
|----------|-----|
| **App** | [ss-cosmetics-production.up.railway.app](https://ss-cosmetics-production.up.railway.app/) |
| **Catálogo** | [/](https://ss-cosmetics-production.up.railway.app/) |
| **Admin** | [/admin](https://ss-cosmetics-production.up.railway.app/admin) |
| **WhatsApp** | [wa.me/51922625609](https://wa.me/51922625609) |

---

## 📊 Base de Datos

**Railway PostgreSQL** con esquema simple:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  on_offer BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  stock INTEGER DEFAULT 10,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📝 Licencia

Proyecto privado — S&S Cosméticos y Accesorios © 2026

---

<div align="center">

**¿Necesitas ayuda?** Escríbeme por [WhatsApp](https://wa.me/51922625609) 💬

*Hecho con amor para S&S* 🌸

</div>
