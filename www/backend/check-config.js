/**
 * Pre-Deployment Configuration Checker
 * Validates your setup before deploying to Hostinger
 * 
 * Usage: node check-config.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('\n🔍 ZULANTIQ Pre-Deployment Configuration Check\n');
console.log('='.repeat(50));

let errors = 0;
let warnings = 0;

// Helper functions
function checkPass(message) {
  console.log(`✅ ${message}`);
}

function checkWarn(message) {
  console.log(`⚠️  ${message}`);
  warnings++;
}

function checkFail(message) {
  console.log(`❌ ${message}`);
  errors++;
}

// Check 1: Required files exist
console.log('\n📁 Checking Files...');
const requiredFiles = [
  'server.js',
  'package.json',
  '.env',
  'zulantiq_landing.html'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    checkPass(`${file} exists`);
  } else {
    checkFail(`${file} is missing`);
  }
});

// Check 2: Environment variables
console.log('\n🔐 Checking Environment Variables...');
const requiredEnvVars = {
  'SMTP_HOST': 'SMTP server hostname',
  'SMTP_PORT': 'SMTP port number',
  'SMTP_SECURE': 'SMTP security setting',
  'SMTP_USER': 'SMTP username (email)',
  'SMTP_PASS': 'SMTP password',
  'EMAIL_TO': 'Destination email address',
  'EMAIL_FROM_NAME': 'Sender name'
};

Object.entries(requiredEnvVars).forEach(([key, desc]) => {
  if (process.env[key]) {
    checkPass(`${key} is set`);
  } else {
    checkFail(`${key} is not set (${desc})`);
  }
});

// Check 3: Validate environment variables
console.log('\n✔️  Validating Configuration...');

// Validate SMTP_HOST
if (process.env.SMTP_HOST) {
  if (process.env.SMTP_HOST.includes('mail.')) {
    checkPass('SMTP_HOST looks correct');
  } else {
    checkWarn('SMTP_HOST should typically be mail.yourdomain.com');
  }
}

// Validate SMTP_PORT
if (process.env.SMTP_PORT) {
  const port = parseInt(process.env.SMTP_PORT);
  if ([25, 465, 587].includes(port)) {
    checkPass(`SMTP_PORT ${port} is valid`);
  } else {
    checkWarn(`SMTP_PORT ${port} is unusual (common: 465, 587)`);
  }
}

// Validate SMTP_SECURE matches port
if (process.env.SMTP_PORT && process.env.SMTP_SECURE) {
  const port = parseInt(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === 'true';
  if (port === 465 && secure) {
    checkPass('SMTP_SECURE matches port 465 (SSL)');
  } else if (port === 587 && !secure) {
    checkPass('SMTP_SECURE matches port 587 (TLS)');
  } else {
    checkWarn('SMTP_SECURE may not match port (465=true, 587=false)');
  }
}

// Validate email formats
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (process.env.SMTP_USER) {
  if (emailRegex.test(process.env.SMTP_USER)) {
    checkPass('SMTP_USER is valid email format');
  } else {
    checkFail('SMTP_USER is not a valid email format');
  }
}

if (process.env.EMAIL_TO) {
  if (emailRegex.test(process.env.EMAIL_TO)) {
    checkPass('EMAIL_TO is valid email format');
  } else {
    checkFail('EMAIL_TO is not a valid email format');
  }
}

// Check 4: package.json validation
console.log('\n📦 Checking package.json...');
try {
  const packageJson = require('./package.json');
  
  const requiredDeps = ['express', 'nodemailer', 'cors', 'dotenv', 'express-rate-limit'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      checkPass(`${dep} is in dependencies`);
    } else {
      checkFail(`${dep} is missing from dependencies`);
    }
  });
} catch (error) {
  checkFail('Cannot read package.json');
}

// Check 5: Node modules installed
console.log('\n📚 Checking node_modules...');
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  checkPass('node_modules directory exists');
  
  const criticalModules = ['express', 'nodemailer', 'cors', 'dotenv'];
  criticalModules.forEach(mod => {
    if (fs.existsSync(path.join(__dirname, 'node_modules', mod))) {
      checkPass(`${mod} is installed`);
    } else {
      checkFail(`${mod} is not installed (run: npm install)`);
    }
  });
} else {
  checkFail('node_modules not found (run: npm install)');
}

// Check 6: Security checks
console.log('\n🔒 Security Checks...');

// Check if .env is in .gitignore
if (fs.existsSync(path.join(__dirname, '.gitignore'))) {
  const gitignore = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf8');
  if (gitignore.includes('.env')) {
    checkPass('.env is in .gitignore');
  } else {
    checkWarn('.env should be in .gitignore to prevent committing secrets');
  }
} else {
  checkWarn('.gitignore file not found');
}

// Check password strength
if (process.env.SMTP_PASS) {
  if (process.env.SMTP_PASS.length < 8) {
    checkWarn('SMTP_PASS is short (use a strong password)');
  } else if (process.env.SMTP_PASS.includes('password') || 
             process.env.SMTP_PASS.includes('123456') ||
             process.env.SMTP_PASS.includes('YourStrongPasswordHere')) {
    checkFail('SMTP_PASS is weak or using placeholder (change it!)');
  } else {
    checkPass('SMTP_PASS looks secure');
  }
}

// Check 7: HTML file validation
console.log('\n🌐 Checking HTML File...');
if (fs.existsSync(path.join(__dirname, 'zulantiq_landing.html'))) {
  const html = fs.readFileSync(path.join(__dirname, 'zulantiq_landing.html'), 'utf8');
  
  if (html.includes('/api/contact')) {
    checkPass('HTML form points to /api/contact');
  } else {
    checkWarn('HTML form may not be configured for backend');
  }
  
  if (html.includes('handleSubmit')) {
    checkPass('Form submit handler exists');
  } else {
    checkFail('Form submit handler (handleSubmit) not found');
  }
} else {
  checkFail('zulantiq_landing.html not found');
}

// Final Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Summary');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('✅ Perfect! Everything looks good!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Test email: npm test');
  console.log('   2. Start server: npm start');
  console.log('   3. Test form locally');
  console.log('   4. Deploy to Hostinger (see DEPLOYMENT.md)');
} else if (errors === 0) {
  console.log(`⚠️  ${warnings} warning(s) found`);
  console.log('You can proceed, but review the warnings above.');
  console.log('\n📝 Next Steps:');
  console.log('   1. Review warnings above');
  console.log('   2. Test email: npm test');
  console.log('   3. Start server: npm start');
} else {
  console.log(`❌ ${errors} error(s) and ${warnings} warning(s) found`);
  console.log('Please fix the errors above before deploying.');
  console.log('\n📝 Common Fixes:');
  console.log('   - Run: npm install');
  console.log('   - Copy .env.example to .env and configure it');
  console.log('   - Update SMTP credentials in .env');
  console.log('   - Check all required files exist');
  process.exit(1);
}

console.log('\n');
