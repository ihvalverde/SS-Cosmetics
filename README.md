# S&S Cosméticos y Accesorios

Catálogo PWA para ventas por WhatsApp.

## Deploy en Render

### 1. Subir código a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/ss-cosmeticos.git
git push -u origin main
```

### 2. Crear cuenta en Render

1. Ve a [render.com](https://render.com)
2. Regístrate con tu cuenta de GitHub
3. Haz clic en **New +** → **Web Service**

### 3. Configurar el servicio

| Campo | Valor |
|-------|-------|
| Name | ss-cosmeticos |
| Region | Oregon (US West) |
| Branch | main |
| Runtime | Node |
| Build Command | `cd frontend && npm install && npm run build` |
| Start Command | `cd backend && node server.js` |
| Instance Type | Free |

### 4. Variables de entorno (opcional)

No se necesitan variables de entorno para el funcionamiento básico.

### 5. Deploy

1. Haz clic en **Create Web Service**
2. Render construirá y desplegará tu app (toma ~2 minutos)
3. Te dará una URL como: `https://ss-cosmeticos.onrender.com`

### 6. Usar la app

- **Admin**: Abre `https://ss-cosmeticos.onrender.com/admin` desde tu celular
- **Clientes**: Comparte `https://ss-cosmeticos.onrender.com` por WhatsApp

## Desarrollo Local

### Backend

```bash
cd backend
npm install
npm run dev
```

Servidor en `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend en `http://localhost:5173`

## Estructura

```
ss-cosmeticos/
├── backend/
│   ├── server.js          # Express + sirve React en producción
│   ├── database.js        # SQLite schema
│   ├── routes/products.js # API CRUD + upload de imágenes
│   └── uploads/           # Imágenes subidas
├── frontend/
│   ├── src/
│   │   ├── pages/         # Catalog.jsx, Admin.jsx
│   │   └── components/    # Header, FilterBar, ProductCard, etc.
│   └── public/            # PWA manifest
└── package.json           # Scripts para Render
```

## Funcionalidades

- **Catálogo** (`/`): Grid responsivo, filtros por marca/categoría, buscador
- **Admin** (`/admin`): Subir productos con fotos, editar, eliminar, controlar stock
- **WhatsApp**: Botón para pedir productos directo a +51 922 625 609
- **PWA**: Instalable desde el navegador del celular
- **Stock**: Badge "Agotado" cuando stock = 0

## Notas

- Las imágenes se guardan localmente en el servidor
- El tier gratuito de Render se duerme tras 15 min sin tráfico
- Para producción, considera un plan de pago o un dominio propio