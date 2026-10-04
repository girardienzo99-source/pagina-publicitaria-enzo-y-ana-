# Río Cuarto Web — Diseño Digital a Medida

Sitio web y catálogo comercial interactivo de **Río Cuarto Web**, desarrollado por **Anahí Gilardi & Enzo Girardi** (Río Cuarto, Córdoba, Argentina).

Desarrollamos sitios web, tiendas online y sistemas a medida para comercios, pymes y profesionales:
- 🍽️ **Gastronomía & Resto-Bares:** Sistema de comandas, mozos con tablet, mapa de mesas y punto de venta.
- 👔 **Indumentaria & Calzado:** Control de stock con matriz de talles y colores.
- 🔧 **Ferreterías & Corralones:** Gestión de insumos por código de barras, cuentas corrientes y presupuestos PDF.
- 🧾 **Facturación Electrónica ARCA (ex AFIP):** Emisión instantánea de comprobantes A, B y C.
- 💊 **Salud & Consultorios:** Historias clínicas digitales y agenda de turnos.
- 🏢 **ERP Multirrubro (+14 rubros):** Software en la nube para empresas y distribuidores.

---

## 🚀 Tecnologías

- **Frontend:** React 19, Vite 6, Tailwind CSS v4, Motion (`motion/react`), Lucide React, QR Code SVG.
- **Backend Serverless (Vercel Functions):**
  - `POST /api/lead`: Recepción y validación segura de consultas con protección honeypot y rate limiting. Notifica automáticamente por Email (Resend o FormSubmit) y Telegram.
  - `POST /api/admin-login`: Autenticación segura con hash y firma HMAC (8 horas de sesión) para el panel de configuración de flayer en navegador.
- **Optimización de Activos:** Imágenes de alta resolución convertidas a WebP (ahorro >70% de peso), lazy loading de modales y componentes pesados.

---

## 🛠️ Desarrollo Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno en `.env`:
   ```bash
   cp .env.example .env
   ```

3. Iniciar servidor de desarrollo (incluye middleware que ejecuta `/api/*` localmente):
   ```bash
   npm run dev
   ```

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## 🔒 Variables de Entorno en Vercel

Configurar en el panel de Vercel (**Settings → Environment Variables**):

| Variable | Requerida | Descripción |
|---|---|---|
| `ADMIN_PASSWORD` | Sí | Contraseña para el panel administrativo (mínimo 10 caracteres). |
| `ADMIN_SESSION_SECRET` | Sí | Clave secreta para firmar tokens HMAC (mínimo 32 caracteres). |
| `LEAD_NOTIFY_EMAIL` | Recomendada | Correo(s) donde llegan las consultas del cotizador (por defecto: `enzogirardi84@gmail.com`). |
| `SITE_URL` | Opcional | URL del sitio (por defecto: `https://riocuarto-web.online`). |
| `RESEND_API_KEY` | Opcional | API Key de Resend para envío de emails profesionales directos. |
| `TELEGRAM_BOT_TOKEN` | Opcional | Token de bot de Telegram para alertas push instantáneas. |
| `TELEGRAM_CHAT_ID` | Opcional | ID del chat de Telegram donde recibir las alertas. |

---

## 📞 Contacto Directo

- **Anahí Gilardi:** +54 358 486-0640 • `anagilardi1234@gmail.com`
- **Enzo Girardi:** +54 358 430-2024 • `enzogirardi84@gmail.com`
- **Web Oficial:** [riocuarto-web.online](https://riocuarto-web.online) / [riocuarto-web.vercel.app](https://riocuarto-web.vercel.app)
