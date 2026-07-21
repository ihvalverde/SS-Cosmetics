<div align="center">

# ✨ S&S Cosméticos y Accesorios ✨

**Tu catálogo de belleza, siempre a un mensaje de distancia.**

[![Deploy en Railway](https://img.shields.io/badge/Deploy-Railway-121212?style=for-the-badge&logo=railway)](https://ss-cosmetics-production.up.railway.app/)
[![PWA Ready](https://img.shields.io/badge/PWA-Instalable-D28CA8?style=for-the-badge&logo=pwa)](https://ss-cosmetics-production.up.railway.app/admin)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Enviar%20Pedido-25D366?style=for-the-badge&logo=whatsapp)](https://wa.me/51922625609)

</div>

---

## 🌸 ¿Qué es S&S?

Una **aplicación web moderna** para que tus clientes descubran tu catálogo de cosméticos y accesorios de forma elegante, y puedan hacer pedidos directo por **WhatsApp** en un toque.

> *Belleza y estilo, siempre conectados.*

---

## 🏗️ Arquitectura

La app está dividida en **dos aplicaciones independientes** alojadas en un solo servidor:

```
┌─────────────────────────────────────────────────────────┐
│                    SERVIDOR (Railway)                     │
│                   Express.js + PostgreSQL                 │
├─────────────────────────┬───────────────────────────────┤
│                         │                                │
│   📱 CATÁLOGO (/)       │    ⚙️ ADMIN (/admin)          │
│   React + Vite           │    React + Vite + PWA         │
│   Web-only (no PWA)      │    Instalable como "S&S Admin"│
│   Para tus clientes      │    Para ti (gestión)          │
│                         │                                │
└─────────────────────────┴───────────────────────────────┘
```

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
- 🏷️ Filtros por marca y categoría (chips interactivos)
- 📊 Ordenamiento alfabético por defecto
- 📱 Diseño mobile-first
- 🎨 Hero section "Belleza y Estilo" con contador de productos
- 💬 Botón WhatsApp por producto (emoji &#128172; para compatibilidad cross-device)

### Panel Admin (`/admin`)
- 📲 **PWA instalable** como "S&S Admin" en tu celular
- ➕ Crear productos con fotos (upload directo a Cloudinary)
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos
- 📦 Control de stock (badge "Agotado" automático)
- 📊 Dashboard con estadísticas (total, oferta, sin stock, marcas)
- 🔍 Búsqueda + filtro por marca (chips)
- 🔗 Compartir link del catálogo
- 📱 FAB button para agregar productos en móvil
- 📋 Modal responsive (bottom-sheet en móvil, inline en desktop)

### WhatsApp Integration
- 💬 Botón flotante en cada producto
- 📲 Envía nombre, precio y marca directamente a +51 922 625 609
- 🎯 Mensaje pre-armado para facilitar el pedido

### PWA (Admin)
- 📲 Instalable desde el navegador (Chrome, Samsung Internet)
- ⚡ Service Worker con cache de assets estáticos
- 🏠 Icono personalizado en el home ("S&S Admin")
- 🎨 Tema Rosa Mauve consistente

---

## 🏗️ Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│               FRONTEND (2 apps separadas)                │
├─────────────────────────────────────────────────────────┤
│  React 18 + Vite       │  Tailwind CSS 3               │
│  React Router 6 (cat)  │  PWA solo en /admin           │
│  base: / (cat)         │  base: /admin/ (admin)        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND                               │
├─────────────────────────────────────────────────────────┤
│  Node.js + Express     │  PostgreSQL (Railway)          │
│  Multer (upload)       │  Cloudinary SDK (imágenes)     │
│  Sirve ambas apps      │  API REST                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  DEPLOYMENT                              │
├─────────────────────────────────────────────────────────┤
│  Railway (App + DB)    │  Cloudinary (Imágenes)         │
│  GitHub (CI/CD)        │  railway.json (build config)   │
└─────────────────────────────────────────────────────────┘
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

### 3. Frontend (Catálogo)

```bash
cd frontend
npm install
npm run dev
```

Frontend en `http://localhost:5173`

### 4. Frontend Admin (PWA)

```bash
cd frontend-admin
npm install
npm run dev
```

Admin en `http://localhost:5174`

### Variables de entorno

```bash
# Backend (.env o en Railway)
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=nzyee6pz
CLOUDINARY_API_KEY=918224318728459
CLOUDINARY_API_SECRET=wZu4lHS0cuKVDEJMkaawoi6NRu0
```

### Scripts disponibles

```bash
npm run build          # Build ambas apps (frontend + frontend-admin)
npm run build:catalog  # Build solo catálogo
npm run build:admin    # Build solo admin
npm run install-all    # Instalar todas las dependencias
npm start              # Iniciar servidor (producción)
npm run dev            # Iniciar servidor (desarrollo con hot-reload)
```

---

## 📁 Estructura del Proyecto

```
ss-cosmeticos/
├── 📄 package.json              # Scripts para Railway (root)
├── 📄 railway.json              # Configuración de build para Railway
├── 📄 .gitignore
│
├── 📁 backend/
│   ├── server.js                # Express + sirve ambas apps en producción
│   ├── database.js              # PostgreSQL pool + init schema
│   ├── routes/products.js       # API CRUD + Cloudinary upload
│   └── package.json
│
├── 📁 frontend/                 # 📱 Catálogo (web-only, sin PWA)
│   ├── index.html
│   ├── vite.config.js           # base: /
│   ├── tailwind.config.js
│   ├── 📁 src/
│   │   ├── App.jsx              # Router (solo Catalog)
│   │   ├── main.jsx             # Sin service worker
│   │   ├── 📁 pages/
│   │   │   └── Catalog.jsx      # Vista cliente
│   │   ├── 📁 components/
│   │   │   ├── Header.jsx       # Logo S&S + buscador
│   │   │   ├── FilterBar.jsx    # Filtros por marca/categoría
│   │   │   ├── ProductCard.jsx  # Tarjeta con botón WhatsApp
│   │   │   └── ProductGrid.jsx  # Grid responsivo
│   │   └── 📁 styles/
│   │       └── index.css        # Tailwind + estilos custom
│   └── 📁 public/
│       ├── logo-ss.png
│       └── vite.svg
│
├── 📁 frontend-admin/           # ⚙️ Admin (PWA instalable "S&S Admin")
│   ├── index.html
│   ├── vite.config.js           # base: /admin/
│   ├── tailwind.config.js
│   ├── 📁 public/
│   │   ├── manifest.json        # PWA manifest
│   │   ├── sw.js                # Service Worker
│   │   └── logo-ss.png
│   ├── 📁 src/
│   │   ├── App.jsx              # Solo Admin (sin router)
│   │   ├── main.jsx             # Registra SW en /admin/sw.js
│   │   ├── 📁 pages/
│   │   │   └── Admin.jsx        # Panel completo de gestión
│   │   ├── 📁 components/
│   │   │   ├── ProductList.jsx  # Lista admin con acciones
│   │   │   └── ProductForm.jsx  # Formulario CRUD responsive
│   │   └── 📁 styles/
│   │       └── index.css
│   └── 📁 dist/                 # Build output (gitignored)
│
└── README.md
```

---

## 🌐 URLs de Producción

| Servicio | URL |
|----------|-----|
| **App** | [ss-cosmetics-production.up.railway.app](https://ss-cosmetics-production.up.railway.app/) |
| **Catálogo** | [/](https://ss-cosmetics-production.up.railway.app/) |
| **Admin** | [/admin](https://ss-cosmetics-production.up.railway.app/admin) |

---

## 📊 Base de Datos

**Railway PostgreSQL** con esquema simple:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  offer_price REAL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- **111 productos** migrados con imágenes en Cloudinary
- **Índices**: `brand`, `category`, `created_at` para búsquedas rápidas
- **SSL habilitado** con `rejectUnauthorized: false` para Railway

---

## 📝 Licencia

Proyecto privado — S&S Cosméticos y Accesorios © 2026

---

<div align="center">

*Hecho con amor para S&S* 🌸

</div>
