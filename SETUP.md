# ZULANTIQ Landing - Full Angular Setup Guide

Complete Angular 17 application with Node.js/Express backend.

## Project Structure

```
Landing/
├── frontend/              # Angular 17 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Page components
│   │   │   ├── services/      # API & Language services
│   │   │   └── models/        # TypeScript interfaces
│   │   ├── assets/
│   │   ├── index.html
│   │   └── styles.scss
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
├── server.js              # Express backend with Nodemailer
├── package.json           # Backend dependencies
├── .env.example          # Environment variables template
└── README.md
```

## Quick Start

### 1. Clone and Install

```bash
# Clone repository
git clone https://github.com/zulantiqtechconsult/landing.git
cd landing

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your SMTP credentials
# Minimum required for development:
# - ALLOWED_ORIGINS=http://localhost:4200
# - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
# - EMAIL_TO (where form submissions go)
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
# From project root
npm start
# Backend runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
# From project root
cd frontend
npm start
# Frontend runs on http://localhost:4200
```

### 4. Open Application

Navigate to `http://localhost:4200`

## Development Workflow

### Backend (Node.js/Express)

**Location:** Project root (`server.js`)

**Start server:**
```bash
npm start
```

**Test email configuration:**
```bash
node test-email.js
```

**Endpoints:**
- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission

**Environment Variables (.env):**
```env
PORT=3000
ALLOWED_ORIGINS=http://localhost:4200
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your_password
EMAIL_TO=info@yourdomain.com
```

### Frontend (Angular 17)

**Location:** `frontend/` directory

**Development:**
```bash
cd frontend
npm start              # Start dev server
npm run build          # Build for production
npm run build:prod     # Build with optimizations
```

**Features:**
- ✅ Responsive design (mobile-first)
- ✅ Spanish/English language toggle
- ✅ Contact form with validation
- ✅ Smooth scrolling navigation
- ✅ API integration with retry logic
- ✅ Loading states and error handling

**Components:**
- `NavbarComponent` - Top navigation with language toggle
- `HeroComponent` - Hero section with animated logo
- `ServicesComponent` - Services grid
- `WhyComponent` - Why choose us section
- `LocationsComponent` - Global locations
- `StartupComponent` - CTA with statistics
- `ContactComponent` - Contact form with validation
- `FooterComponent` - Footer with links

## Production Build

### Build Frontend

```bash
cd frontend
npm run build:prod
```

Output: `frontend/dist/zulantiq-landing/`

### Deploy Backend

```bash
# Set production environment
NODE_ENV=production

# Update .env with production values
ALLOWED_ORIGINS=https://yourdomain.com
PORT=3000

# Start with PM2 (recommended)
npm install -g pm2
pm2 start server.js --name zulantiq-api

# Or use ecosystem config
pm2 start ecosystem.config.js
```

### Deploy Frontend

Option 1 - Serve via backend (same domain):
```bash
# Copy built files to public directory
cp -r frontend/dist/zulantiq-landing/* public/

# Update server.js to serve static files
# See docs/SAME-DOMAIN-DEPLOYMENT.md
```

Option 2 - Separate frontend server:
```bash
# Deploy to Netlify, Vercel, or any static host
# Update frontend API URL to production backend
# See frontend/src/app/services/api.service.ts
```

## CORS Configuration

The backend accepts requests from origins listed in `ALLOWED_ORIGINS`:

**Development:**
```env
ALLOWED_ORIGINS=http://localhost:4200
```

**Production:**
```env
ALLOWED_ORIGINS=https://zulantiq.com,https://www.zulantiq.com
```

## Email Configuration

### Hostinger SMTP Setup

1. Create email account in cPanel
2. Get SMTP credentials from "Configure Email Client"
3. Update `.env`:
   ```env
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=contact@yourdomain.com
   SMTP_PASS=your_password
   EMAIL_TO=info@yourdomain.com
   ```

### Test Email

```bash
node test-email.js
```

## Troubleshooting

### Backend Issues

**SMTP Connection Error:**
- Verify SMTP credentials in `.env`
- Check firewall allows outbound port 465/587
- Try alternate port (587 with SMTP_SECURE=false)

**CORS Error:**
- Add frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart backend after changing `.env`

### Frontend Issues

**Can't connect to backend:**
- Verify backend is running on port 3000
- Check API URL in `frontend/src/app/services/api.service.ts`
- Check browser console for CORS errors

**Build errors:**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Angular cache: `rm -rf .angular`

## Tech Stack

**Frontend:**
- Angular 17
- TypeScript 5.2
- RxJS 7.8
- SCSS with CSS custom properties
- Reactive Forms

**Backend:**
- Node.js 18+
- Express 4.18
- Nodemailer 6.9
- CORS, Rate Limiting
- dotenv for configuration

## Scripts

**Backend:**
```bash
npm start              # Start server
npm run check-config   # Verify email configuration
npm test               # Run tests (if available)
```

**Frontend:**
```bash
npm start              # Dev server (localhost:4200)
npm run build          # Production build
npm run build:prod     # Optimized build
```

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [Hostinger Setup](docs/QUICKSTART-HOSTINGER.md)
- [Same Domain Deployment](docs/SAME-DOMAIN-DEPLOYMENT.md)
- [Frontend README](frontend/README.md)

## License

Copyright © 2025 ZULANTIQ. All rights reserved.

## Support

For issues or questions:
- Email: info@zulantiq.com
- GitHub: https://github.com/zulantiqtechconsult/landing
