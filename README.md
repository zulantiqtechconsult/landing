# ZULANTIQ Landing Page

Modern full-stack landing page built with **Angular 17** and **Node.js/Express**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Development

**1. Clone and install backend:**
```bash
git clone https://github.com/zulantiqtechconsult/landing.git
cd landing
npm install
```

**2. Install frontend:**
```bash
cd frontend
npm install
cd ..
```

**3. Configure environment:**
```bash
cp .env.example .env
# Edit .env with your SMTP credentials
# Minimum: ALLOWED_ORIGINS=http://localhost:4200
```

**4. Start development servers:**

**Terminal 1 - Backend:**
```bash
npm start
# Runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:4200
```

**5. Open browser:**
```
http://localhost:4200
```

## 📁 Project Structure

```
landing/
├── frontend/               # Angular 17 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Page components
│   │   │   │   ├── navbar/        # Navigation with language toggle
│   │   │   │   ├── hero/          # Hero section with animated logo
│   │   │   │   ├── services/      # Services grid
│   │   │   │   ├── why/           # Why choose us
│   │   │   │   ├── locations/     # Global locations
│   │   │   │   ├── startup/       # CTA with stats
│   │   │   │   ├── contact/       # Contact form
│   │   │   │   └── footer/        # Footer
│   │   │   ├── services/          # Angular services
│   │   │   │   ├── api.service.ts         # HTTP API calls
│   │   │   │   └── language.service.ts    # ES/EN toggle
│   │   │   ├── models/            # TypeScript interfaces
│   │   │   │   └── models.ts
│   │   │   ├── app.module.ts      # Root module
│   │   │   └── app-routing.module.ts
│   │   ├── assets/
│   │   │   └── images/            # Static images
│   │   ├── index.html
│   │   └── styles.scss            # Global styles
│   ├── angular.json
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md                  # Frontend docs
│
├── server.js               # Express Backend
├── package.json            # Backend dependencies
├── .env.example           # Environment template
├── .env                   # Your credentials (git ignored)
├── SETUP.md              # Complete setup guide
├── STRUCTURE.md          # Architecture docs
└── docs/                 # Additional documentation
    ├── DEPLOYMENT.md
    ├── QUICKSTART-HOSTINGER.md
    └── SAME-DOMAIN-DEPLOYMENT.md
```

## ✨ Features

### Frontend (Angular 17)
- ✅ **Component Architecture**: Modular, reusable components
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Multi-language**: Spanish/English toggle with localStorage
- ✅ **Reactive Forms**: Contact form with validation
- ✅ **Smooth Animations**: Modern UI/UX with CSS animations
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **API Integration**: RxJS observables with retry logic
- ✅ **Smooth Scrolling**: Anchor navigation between sections

### Backend (Node.js/Express)
- ✅ **RESTful API**: `/api/health`, `/api/contact`
- ✅ **Email Integration**: Nodemailer with SMTP
- ✅ **Rate Limiting**: 3 requests per 15 minutes
- ✅ **CORS Protection**: Configurable allowed origins
- ✅ **Input Validation**: Email format validation
- ✅ **Auto-Reply**: Confirmation emails to users
- ✅ **Admin Notifications**: Form submissions to admin email
- ✅ **Error Handling**: Comprehensive error responses

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 17.0.0
- **Language**: TypeScript 5.2.2
- **Reactive**: RxJS 7.8.0
- **Styles**: SCSS with CSS custom properties
- **Forms**: Reactive Forms with validators
- **HTTP**: HttpClient with interceptors

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 4.18
- **Email**: Nodemailer 6.9
- **Security**: CORS, express-rate-limit
- **Config**: dotenv

## 📝 Scripts

### Backend (from project root)
```bash
npm start              # Start Express server (port 3000)
npm run check-config   # Verify email configuration
node test-email.js     # Test email sending
```

### Frontend (from frontend/)
```bash
npm start              # Dev server (localhost:4200)
npm run build          # Build for production
npm run build:prod     # Optimized production build
```

## 🔧 Configuration

### Environment Variables (.env)

Create `.env` from `.env.example`:

```env
# Server
PORT=3000
NODE_ENV=development

# CORS - Add Angular dev server
ALLOWED_ORIGINS=http://localhost:4200,https://zulantiq.com

# SMTP Configuration (Hostinger)
SMTP_HOST=mail.zulantiq.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@zulantiq.com
SMTP_PASS=your_password_here

# Email Settings
EMAIL_TO=info@zulantiq.com
EMAIL_FROM_NAME=ZULANTIQ
SEND_AUTO_REPLY=true
```

See [SETUP.md](SETUP.md) for detailed configuration guide.

## 🚢 Production Deployment

### Option 1: Same Domain (Recommended)

Deploy both frontend and backend on same domain:

1. Build frontend:
   ```bash
   cd frontend
   npm run build:prod
   ```

2. Serve static files from Express

3. Deploy to Hostinger/VPS

See [docs/SAME-DOMAIN-DEPLOYMENT.md](docs/SAME-DOMAIN-DEPLOYMENT.md)

### Option 2: Separate Deployment

- **Frontend**: Netlify, Vercel, or static hosting
- **Backend**: Hostinger, VPS, or cloud platform

Update API URL in:
- `frontend/src/app/services/api.service.ts`

## 🔐 Security

- ✅ CORS whitelist for allowed origins
- ✅ Rate limiting to prevent spam
- ✅ Environment variables for secrets
- ✅ Input validation on backend
- ✅ Email sanitization
- ✅ No inline credentials

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup and configuration guide
- **[frontend/README.md](frontend/README.md)** - Angular app documentation
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Production deployment
- **[docs/QUICKSTART-HOSTINGER.md](docs/QUICKSTART-HOSTINGER.md)** - Hostinger setup
- **[STRUCTURE.md](STRUCTURE.md)** - Project architecture

## 🌍 Global Presence

ZULANTIQ operates in three continents:

- 🇪🇸 **Spain** - Madrid (CET UTC+1)
- 🇺🇸 **USA** - Miami, FL (EST UTC-5)
- 🇦🇺 **Australia** - Sydney (AEST UTC+10)

24/7 support across all timezones.

## 📧 Contact

- **Email**: info@zulantiq.com
- **Website**: https://zulantiq.com
- **GitHub**: https://github.com/zulantiqtechconsult
- **LinkedIn**: https://linkedin.com/company/zulantiq

## 🧪 Testing

### Test Backend Email
```bash
node test-email.js
```

### Test API Endpoint
```bash
curl http://localhost:3000/api/health
```

### Test Contact Form
1. Start both servers (backend + frontend)
2. Navigate to http://localhost:4200
3. Fill contact form
4. Submit and check admin email

## 🐛 Troubleshooting

### Backend won't start
- Check `.env` file exists with correct values
- Verify port 3000 is not in use: `netstat -ano | findstr :3000`
- Check SMTP credentials are correct

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check CORS is configured: `ALLOWED_ORIGINS=http://localhost:4200`
- Check browser console for CORS errors

### Email not sending
- Run `node test-email.js` to verify SMTP config
- Check Hostinger SMTP settings in hPanel
- Verify firewall allows outbound port 465/587

See [SETUP.md](SETUP.md) for more troubleshooting.

## 📄 License

Copyright © 2025 ZULANTIQ Tech Consult. All rights reserved.

---

**Built with ❤️ by ZULANTIQ**
