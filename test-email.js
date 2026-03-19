/**
 * SMTP Connection Test
 * Tests your Hostinger email configuration before deploying
 * 
 * Usage: node test-email.js
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('\n🧪 ZULANTIQ Email Configuration Test\n');
console.log('====================================\n');

// Display current configuration (hiding password)
console.log('📋 Current Configuration:');
console.log(`   SMTP Host: ${process.env.SMTP_HOST || '❌ NOT SET'}`);
console.log(`   SMTP Port: ${process.env.SMTP_PORT || '❌ NOT SET'}`);
console.log(`   SMTP Secure: ${process.env.SMTP_SECURE || '❌ NOT SET'}`);
console.log(`   SMTP User: ${process.env.SMTP_USER || '❌ NOT SET'}`);
console.log(`   SMTP Pass: ${process.env.SMTP_PASS ? '✅ SET (hidden)' : '❌ NOT SET'}`);
console.log(`   Email To: ${process.env.EMAIL_TO || '❌ NOT SET'}`);
console.log('\n');

// Check if all required variables are set
const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_TO'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach(key => console.error(`   - ${key}`));
  console.error('\n⚠️  Please copy .env.example to .env and configure it.\n');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test 1: Verify SMTP connection
console.log('🔌 Test 1: Testing SMTP connection...');
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Failed!');
    console.error('   Error:', error.message);
    console.error('\n📝 Troubleshooting:');
    console.error('   1. Check SMTP_HOST is correct (usually mail.yourdomain.com)');
    console.error('   2. Verify SMTP_USER and SMTP_PASS are correct');
    console.error('   3. Try port 587 if 465 doesn\'t work');
    console.error('   4. Check if your Hostinger email account is active\n');
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Successful!\n');
    
    // Test 2: Send test email
    sendTestEmail();
  }
});

// Send actual test email
async function sendTestEmail() {
  console.log('📧 Test 2: Sending test email...');
  console.log(`   From: ${process.env.SMTP_USER}`);
  console.log(`   To: ${process.env.EMAIL_TO}`);
  console.log('   Subject: Test Email - ZULANTIQ Backend\n');
  
  const testEmail = {
    from: `"${process.env.EMAIL_FROM_NAME || 'ZULANTIQ'}" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: '✅ Test Email - ZULANTIQ Backend Configuration',
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
          .success { color: #0f9494; font-size: 24px; font-weight: bold; }
          .info { background: #e8f8f8; padding: 15px; border-left: 4px solid #1ec8c8; margin: 20px 0; }
          code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Email Configuration Test</h1>
          </div>
          <div class="content">
            <p class="success">¡Configuración exitosa!</p>
            <p>Este es un email de prueba del backend de ZULANTIQ Tech Consult.</p>
            
            <div class="info">
              <strong>📋 Detalles de configuración:</strong><br>
              <strong>SMTP Host:</strong> ${process.env.SMTP_HOST}<br>
              <strong>SMTP Port:</strong> ${process.env.SMTP_PORT}<br>
              <strong>From:</strong> ${process.env.SMTP_USER}<br>
              <strong>To:</strong> ${process.env.EMAIL_TO}<br>
              <strong>Timestamp:</strong> ${new Date().toLocaleString('es-CO', {
                timeZone: 'America/Bogota',
                dateStyle: 'full',
                timeStyle: 'long'
              })}
            </div>
            
            <h3>✅ Todo está funcionando correctamente</h3>
            <p>Tu configuración de email está lista para producción. Los mensajes del formulario de contacto se enviarán a esta dirección.</p>
            
            <h3>📝 Próximos pasos:</h3>
            <ol>
              <li>Sube los archivos al servidor de Hostinger</li>
              <li>Configura las variables de entorno en el servidor</li>
              <li>Inicia el servidor Node.js</li>
              <li>Prueba el formulario desde la web</li>
            </ol>
            
            <div class="info">
              <strong>⚠️ Nota:</strong> Si estás viendo este email en la carpeta de SPAM, asegúrate de marcarlo como "No es spam" y agregar <code>${process.env.SMTP_USER}</code> a tus contactos.
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 12px; text-align: center;">
              <strong>ZULANTIQ Tech Consult S.A.S.</strong><br>
              Medellín & Bogotá, Colombia<br>
              Backend Email System Test
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test Email Sent Successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}\n`);
    console.log('====================================');
    console.log('🎉 All Tests Passed!');
    console.log('====================================\n');
    console.log('✅ Your email configuration is working correctly.');
    console.log(`📬 Check your inbox at: ${process.env.EMAIL_TO}\n`);
    console.log('📝 Next steps:');
    console.log('   1. Check if email arrived (also check SPAM folder)');
    console.log('   2. Deploy to Hostinger following DEPLOYMENT.md');
    console.log('   3. Test the contact form on your live website\n');
  } catch (error) {
    console.error('❌ Failed to Send Test Email!');
    console.error('   Error:', error.message);
    console.error('\n📝 Troubleshooting:');
    console.error('   1. SMTP connection works but sending failed');
    console.error('   2. Check if your email account has sending permissions');
    console.error('   3. Verify EMAIL_TO is a valid email address');
    console.error('   4. Check Hostinger email quota/limits\n');
    process.exit(1);
  }
}
