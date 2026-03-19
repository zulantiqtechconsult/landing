# ⚡ Quick Start Guide

Get your ZULANTIQ landing page email backend running in 5 minutes!

---

## 🏃 Local Development (Testing on Your Computer)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Email
```bash
# Copy the example config
cp .env.example .env

# Edit .env with your text editor
# Add your Hostinger email credentials
notepad .env  # Windows
nano .env     # Mac/Linux
```

**Required settings in `.env`:**
```env
SMTP_HOST=mail.zulantiq.com
SMTP_USER=contacto@zulantiq.com
SMTP_PASS=your-password-here
EMAIL_TO=info@zulantiq.com
```

### Step 3: Test Email Configuration
```bash
npm test
```
✅ If successful, you'll receive a test email!

### Step 4: Start Server
```bash
npm start
```
Server runs on: `http://localhost:3000`

### Step 5: Test Contact Form
1. Open `zulantiq_landing.html` in your browser
2. Fill out the contact form
3. Submit
4. Check your email!

---

## 🌐 Production Deployment (Hostinger)

### Quick Deploy:
```bash
# 1. Connect to Hostinger via SSH
ssh u123456789@yourdomain.com

# 2. Navigate to your site
cd ~/domains/zulantiq.com/public_html

# 3. Create backend folder and upload files
mkdir backend
# Upload: server.js, package.json, .env

# 4. Install dependencies
cd backend
npm install

# 5. Start with PM2
pm2 start server.js --name zulantiq-backend
pm2 save
```

**📖 Full instructions:** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## ✅ Verify Everything Works

### Check 1: Server Health
```bash
curl http://localhost:3000/api/health
```
Should return: `{"status":"ok",...}`

### Check 2: SMTP Connection
```bash
npm test
```
Check your inbox for test email

### Check 3: Contact Form
Fill and submit the form on your website

---

## 🆘 Quick Troubleshooting

### ❌ "SMTP Connection Error"
→ Check credentials in `.env`  
→ Verify email account exists in Hostinger  
→ Try port 587 instead of 465

### ❌ "Cannot POST /api/contact"
→ Server not running? Run `npm start`  
→ Check API URL in HTML file

### ❌ "Rate limit exceeded"
→ Wait 15 minutes (anti-spam protection)

---

## 📞 Need Help?

1. Read [README.md](README.md) - Full documentation
2. Read [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
3. Check server logs: `pm2 logs zulantiq-backend`

---

## 🎯 You're Done!

✅ Backend configured  
✅ Email sending works  
✅ Contact form functional  
✅ Ready for production  

**Next:** Deploy to Hostinger and go live! 🚀
