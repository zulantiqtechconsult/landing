# 🚀 Deployment Guide - Hostinger.com

Complete step-by-step guide to deploy the ZULANTIQ landing page with Node.js email backend on Hostinger.

---

## 📋 Prerequisites

- Hostinger account with Node.js hosting plan
- Domain configured (e.g., zulantiq.com)
- Email account created in Hostinger
- SSH access enabled

---

## 🔧 Step 1: Prepare Email Account on Hostinger

1. **Login to Hostinger Panel** (hpanel.hostinger.com)

2. **Create Email Account**:
   - Go to **Emails** > **Email Accounts**
   - Click **Create Email Account**
   - Create: `contacto@zulantiq.com`
   - Set a strong password
   - Save the credentials

3. **Get SMTP Settings**:
   - Click on the email account
   - Click **Configuration** or **Email Client Setup**
   - Note down:
     - **Incoming Server**: `mail.zulantiq.com`
     - **Outgoing Server (SMTP)**: `mail.zulantiq.com`
     - **SMTP Port**: `465` (SSL) or `587` (TLS)
     - **Username**: `contacto@zulantiq.com`
     - **Password**: Your password

---

## 📦 Step 2: Upload Files via SSH

### Option A: Using SSH/Terminal

```bash
# Connect to your Hostinger server
ssh u123456789@yourdomain.com

# Navigate to public_html or your app directory
cd ~/domains/zulantiq.com/public_html

# Create a directory for the backend
mkdir backend
cd backend

# Upload files (from your local machine)
# Use SCP or SFTP client
```

### Option B: Using File Manager

1. Go to **Hostinger Panel** > **File Manager**
2. Navigate to `public_html`
3. Create `backend` folder
4. Upload these files:
   - `server.js`
   - `package.json`
   - `.env.example`

---

## 🔐 Step 3: Configure Environment Variables

1. **Rename `.env.example` to `.env`**:
   ```bash
   mv .env.example .env
   ```

2. **Edit `.env` file**:
   ```bash
   nano .env
   # or use File Manager's code editor
   ```

3. **Update with your real values**:
   ```env
   NODE_ENV=production
   PORT=3000
   
   ALLOWED_ORIGINS=https://zulantiq.com,https://www.zulantiq.com
   
   # SMTP Configuration
   SMTP_HOST=mail.zulantiq.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=contacto@zulantiq.com
   SMTP_PASS=YourActualPasswordHere
   
   EMAIL_FROM_NAME=ZULANTIQ Tech Consult
   EMAIL_TO=info@zulantiq.com
   SEND_AUTO_REPLY=true
   ```

4. **Save and exit** (Ctrl+X, Y, Enter if using nano)

⚠️ **SECURITY**: Make sure `.env` is NOT in `public_html` accessible folder!

---

## 📥 Step 4: Install Dependencies

```bash
# Navigate to backend directory
cd ~/domains/zulantiq.com/public_html/backend

# Install Node packages
npm install

# Verify installation
npm list
```

---

## 🚀 Step 5: Configure Node.js Application

### Using Hostinger Node.js Application Manager:

1. **Go to Hostinger Panel** > **Advanced** > **Node.js**

2. **Create Application**:
   - Application Mode: **Production**
   - Application Root: `public_html/backend`
   - Application URL: `https://zulantiq.com`
   - Application Startup File: `server.js`
   - Node.js Version: **16.x** or higher

3. **Environment Variables** (if available in Hostinger UI):
   - Add each variable from `.env` file manually
   - Or keep using `.env` file

4. **Click Create** or **Start Application**

---

## 🌐 Step 6: Configure Frontend

1. **Upload `zulantiq_landing.html`**:
   - Rename to `index.html`
   - Place in `public_html` root

2. **Update API URL in `index.html`**:
   
   Find this line (around line 591):
   ```javascript
   const API_URL = window.location.hostname === 'localhost' 
     ? 'http://localhost:3000/api/contact'
     : '/api/contact';
   ```
   
   **If using subdomain** (e.g., api.zulantiq.com):
   ```javascript
   const API_URL = 'https://api.zulantiq.com/api/contact';
   ```
   
   **If same domain with proxy**:
   ```javascript
   const API_URL = '/api/contact';
   ```

---

## ⚙️ Step 7: Configure Reverse Proxy (RECOMMENDED)

To route `/api/*` requests to Node.js backend:

### Create `.htaccess` in `public_html`:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Proxy API requests to Node.js backend
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]

# Serve static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

### Alternative: Nginx Configuration (if available)

```nginx
location /api/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## 🔄 Step 8: Start the Node.js Server

### Using Hostinger Panel:
- Go to **Node.js** section
- Click **Start** or **Restart** application

### Using SSH with PM2 (Process Manager):
```bash
# Install PM2 globally
npm install -g pm2

# Start server with PM2
pm2 start server.js --name zulantiq-backend

# Enable auto-restart on system reboot
pm2 startup
pm2 save

# Monitor logs
pm2 logs zulantiq-backend
```

---

## ✅ Step 9: Test the Setup

### Test 1: Server Health
```bash
curl https://zulantiq.com/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Test 2: Contact Form
1. Visit `https://zulantiq.com`
2. Fill out the contact form
3. Click "Enviar Mensaje"
4. Check for success message
5. Check your email inbox

### Test 3: Check Logs
```bash
# If using PM2
pm2 logs zulantiq-backend

# Or check server logs
cat ~/domains/zulantiq.com/logs/error.log
```

---

## 🐛 Troubleshooting

### Issue: "Cannot POST /api/contact"
**Solution**: Reverse proxy not configured correctly
- Check `.htaccess` file
- Verify Node.js app is running

### Issue: "SMTP Connection Error"
**Solutions**:
1. Verify SMTP credentials in `.env`
2. Check if Hostinger allows SMTP on port 465/587
3. Try alternative port (587 instead of 465)
4. Ensure email account exists and is active

### Issue: "Rate limit exceeded"
**Solution**: You're testing too frequently
- Wait 15 minutes
- Adjust rate limit in `server.js`

### Issue: Node.js app not starting
**Solutions**:
```bash
# Check Node.js version
node --version  # Should be 16.x or higher

# Check for errors
npm start

# Verify dependencies
npm install --production
```

---

## 🔒 Security Checklist

- ✅ `.env` file is NOT in public directory
- ✅ `.env` is in `.gitignore`
- ✅ Strong SMTP password used
- ✅ Rate limiting enabled (default: 3 requests per 15 min)
- ✅ CORS configured for your domain only
- ✅ HTTPS enabled on domain
- ✅ Input validation on all form fields

---

## 📊 Monitoring

### Check Server Status:
```bash
pm2 status
pm2 monit
```

### View Logs:
```bash
pm2 logs zulantiq-backend --lines 100
```

### Restart Server:
```bash
pm2 restart zulantiq-backend
```

---

## 🔄 Updates & Maintenance

### Update Code:
```bash
cd ~/domains/zulantiq.com/public_html/backend

# Pull latest changes (if using git)
git pull

# Install new dependencies
npm install

# Restart server
pm2 restart zulantiq-backend
```

### Update Environment Variables:
```bash
nano .env
# Make changes
pm2 restart zulantiq-backend
```

---

## 📞 Support

If you encounter issues:

1. **Check Hostinger Documentation**: 
   - https://support.hostinger.com/en/articles/5937974-how-to-set-up-a-node-js-application

2. **Check logs** for specific error messages

3. **Verify SMTP settings** in Hostinger email configuration

4. **Test SMTP connection** separately:
   ```bash
   node -e "require('./server.js')"
   # Should show: ✅ SMTP Server ready to send emails
   ```

---

## 🎉 Success!

Your landing page is now live with a fully functional email backend!

Test URL: `https://zulantiq.com`

Contact form submissions will be sent to: `info@zulantiq.com`
