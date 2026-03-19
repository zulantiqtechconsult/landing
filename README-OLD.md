# ZULANTIQ Landing Page - Email Backend

Complete Node.js email solution for the ZULANTIQ Tech Consult landing page contact form, configured for Hostinger.com hosting.

---

## 📁 Project Structure

```
Landing/
├── zulantiq_landing.html    # Main landing page (Frontend)
├── server.js                # Node.js backend server
├── package.json             # Dependencies
├── .env.example             # Environment variables template
├── .env                     # Actual credentials (DO NOT COMMIT)
├── .gitignore              # Git ignore rules
├── DEPLOYMENT.md           # Full deployment guide
└── README.md               # This file
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy example config
cp .env.example .env

# Edit .env with your credentials
nano .env
```

### 3. Start Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 4. Test
- Frontend: Open `zulantiq_landing.html` in browser
- API Health: `http://localhost:3000/api/health`
- Submit test form

---

## 🌐 Features

### Backend (server.js)
- ✅ Express.js server
- ✅ Nodemailer for email sending
- ✅ CORS protection
- ✅ Rate limiting (3 requests per 15 minutes)
- ✅ Input validation
- ✅ Professional HTML email templates
- ✅ Auto-reply to customers
- ✅ Admin notification emails
- ✅ Hostinger SMTP optimized

### Frontend (HTML Form)
- ✅ Async form submission
- ✅ Loading states
- ✅ Success/error messages
- ✅ Bilingual support (ES/EN)
- ✅ No page refresh
- ✅ Client-side validation

---

## 📧 Email Configuration (Hostinger)

### Required Environment Variables:

```env
SMTP_HOST=mail.zulantiq.com          # Your Hostinger mail server
SMTP_PORT=465                         # 465 (SSL) or 587 (TLS)
SMTP_SECURE=true                      # true for 465, false for 587
SMTP_USER=contacto@zulantiq.com      # Your email account
SMTP_PASS=your-strong-password        # Email password
EMAIL_TO=info@zulantiq.com           # Where to receive submissions
```

### Get Hostinger SMTP Settings:
1. Login to Hostinger hPanel
2. Go to **Emails** > **Email Accounts**
3. Click on your email account
4. Click **Configure Email Client**
5. Copy SMTP settings

---

## 🔐 Security Features

- **Environment Variables**: Sensitive data in `.env` (not committed)
- **Rate Limiting**: Prevents spam (3 requests/15min per IP)
- **CORS**: Only allows requests from specified domains
- **Input Validation**: Email format, required fields
- **HTTPS**: Recommended for production
- **Password Protection**: SMTP credentials secured

---

## 📊 API Endpoints

### `GET /api/health`
Health check endpoint
```json
{
  "status": "ok",
  "timestamp": "2026-03-19T10:30:00.000Z"
}
```

### `POST /api/contact`
Submit contact form

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "company": "Mi Empresa S.A.S.",
  "email": "juan@miempresa.com",
  "service": "digital",
  "message": "Necesito consultoría..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Te contactaremos pronto."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Por favor completa todos los campos requeridos."
}
```

---

## 🧪 Testing

### Test SMTP Connection
```bash
node server.js
# Should see: ✅ SMTP Server ready to send emails
```

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```

### Test Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "digital",
    "message": "Test message"
  }'
```

---

## 📦 Deployment

**Full deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy to Hostinger:

1. **Upload files** via SSH/FTP
2. **Configure `.env`** with Hostinger SMTP
3. **Install dependencies**: `npm install`
4. **Start with PM2**: `pm2 start server.js`
5. **Configure proxy** in `.htaccess`
6. **Test form** on live site

---

## 🔧 Configuration Options

### Change Rate Limit
Edit `server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Change this
  max: 3, // Change this
  ...
});
```

### Disable Auto-Reply
Set in `.env`:
```env
SEND_AUTO_REPLY=false
```

### Change Email Templates
Edit HTML templates in `server.js`:
- `mailOptionsAdmin` (admin notification)
- `mailOptionsClient` (customer auto-reply)

---

## 🐛 Common Issues

### "SMTP Connection Error"
- ✅ Check SMTP credentials in `.env`
- ✅ Verify email account is active in Hostinger
- ✅ Try port 587 instead of 465
- ✅ Check if SMTP is enabled for your plan

### "Cannot POST /api/contact"
- ✅ Server not running → Start with `npm start`
- ✅ CORS issue → Add domain to `ALLOWED_ORIGINS`
- ✅ Proxy not configured → Check `.htaccess`

### "Rate limit exceeded"
- ✅ Wait 15 minutes
- ✅ Test from different IP
- ✅ Increase limit in `server.js`

### Form not submitting
- ✅ Check browser console for errors
- ✅ Verify API_URL in HTML matches server
- ✅ Check CORS configuration

---

## 📝 Dependencies

```json
{
  "express": "^4.18.2",         // Web server
  "nodemailer": "^6.9.7",       // Email sending
  "cors": "^2.8.5",             // CORS protection
  "dotenv": "^16.3.1",          // Environment variables
  "express-rate-limit": "^7.1.5" // Rate limiting
}
```

---

## 🔄 Updates

### Update Dependencies
```bash
npm update
npm audit fix
```

### Update Code
```bash
git pull
npm install
pm2 restart zulantiq-backend
```

---

## 📞 Support

**Email**: contacto@zulantiq.com  
**Website**: https://zulantiq.com  
**Location**: Medellín & Bogotá, Colombia

---

## 📄 License

Proprietary - ZULANTIQ Tech Consult S.A.S. © 2026

---

## ✅ Checklist Before Going Live

- [ ] `.env` configured with real credentials
- [ ] `.env` added to `.gitignore`
- [ ] Tested SMTP connection
- [ ] Tested form submission locally
- [ ] Dependencies installed on server
- [ ] Node.js app started (PM2 or Hostinger panel)
- [ ] Reverse proxy configured
- [ ] SSL certificate active (HTTPS)
- [ ] Test email received
- [ ] Auto-reply working (if enabled)
- [ ] Rate limiting working
- [ ] CORS configured for production domain
- [ ] Error logging working
- [ ] Mobile form tested

---

**🎉 Ready to receive customer inquiries!**
