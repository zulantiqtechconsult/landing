const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: { 
    success: false, 
    error: 'Demasiadas solicitudes. Por favor intenta de nuevo más tarde.' 
  }
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false // For compatibility with some SMTP servers
  }
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Server ready to send emails');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', limiter, async (req, res) => {
  try {
    const { name, company, email, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Por favor completa todos los campos requeridos.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Por favor proporciona un email válido.'
      });
    }

    // Service labels mapping
    const serviceLabels = {
      digital: 'Consultoría Digital',
      provider: 'Consultoría para Proveedores',
      sales: 'Evaluación Técnica de Ventas',
      dev: 'Desarrollo de Software'
    };

    const serviceName = serviceLabels[service] || 'No especificado';
    const companyText = company ? `<strong>Empresa:</strong> ${company}<br>` : '';

    // Email content for admin
    const mailOptionsAdmin = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `🔔 Nueva consulta: ${serviceName} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
            .header { background: #1ec8c8; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 4px; }
            .field strong { color: #1ec8c8; }
            .message-box { background: #e8f8f8; padding: 15px; border-left: 4px solid #1ec8c8; margin-top: 20px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 Nueva Consulta desde la Web</h2>
            </div>
            <div class="content">
              <div class="field">
                <strong>Nombre:</strong> ${name}
              </div>
              <div class="field">
                ${companyText}
              </div>
              <div class="field">
                <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <strong>Servicio de interés:</strong> ${serviceName}
              </div>
              <div class="message-box">
                <strong>Mensaje:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </div>
              <div class="footer">
                <p>📅 Recibido: ${new Date().toLocaleString('es-CO', {
                  timeZone: 'America/Bogota',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</p>
                <p>🌐 ZULANTIQ Tech Consult S.A.S.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Auto-reply email for the client
    const mailOptionsClient = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '✅ Hemos recibido tu mensaje - ZULANTIQ Tech Consult',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
            .header { background: #1ec8c8; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 30px; background: #1ec8c8; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Gracias por contactarnos!</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${name}</strong>,</p>
              <p>Hemos recibido tu mensaje sobre <strong>${serviceName}</strong> y queremos agradecerte por tu interés en ZULANTIQ Tech Consult.</p>
              <p>Nuestro equipo revisará tu consulta y te responderá a la brevedad posible, generalmente en las próximas <strong>24-48 horas</strong>.</p>
              <p>Si tienes alguna pregunta urgente, no dudes en escribirnos directamente a <a href="mailto:${process.env.EMAIL_TO}">${process.env.EMAIL_TO}</a>.</p>
              <div class="footer">
                <p><strong>ZULANTIQ Tech Consult S.A.S.</strong></p>
                <p>📍 Medellín & Bogotá, Colombia</p>
                <p>🌐 <a href="https://wa.me/573000000000">WhatsApp</a> | <a href="https://www.linkedin.com/company/zulantiq-tech-consult">LinkedIn</a></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send both emails
    await transporter.sendMail(mailOptionsAdmin);
    
    // Send auto-reply (optional - can be disabled)
    if (process.env.SEND_AUTO_REPLY === 'true') {
      await transporter.sendMail(mailOptionsClient);
    }

    console.log(`✅ Email sent from: ${email} (${name})`);

    res.json({
      success: true,
      message: 'Mensaje enviado correctamente. Te contactaremos pronto.'
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Error al enviar el mensaje. Por favor intenta de nuevo.'
    });
  }
});

// Serve static files (for production)
app.use(express.static('public'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email destination: ${process.env.EMAIL_TO}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
