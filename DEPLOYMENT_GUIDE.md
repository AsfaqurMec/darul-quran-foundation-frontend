# Deployment Guide for DarulQuran Foundation Frontend
## CentOS VPS Deployment - darulquranfoundation.org

This guide will walk you through deploying your Next.js application to a CentOS VPS server.

---

## Prerequisites

- CentOS VPS with root/sudo access
- Domain name `darulquranfoundation.org` pointing to your VPS IP
- SSH access to your server
- Basic knowledge of Linux commands

---

## Step 1: Initial Server Setup

### 1.1 Update System Packages

```bash
sudo yum update -y
```

### 1.2 Install Essential Tools

```bash
sudo yum install -y git curl wget
```

---

## Step 2: Install Node.js

### 2.1 Install Node.js 20.x (LTS)

```bash
# Install NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Install Node.js
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

---

## Step 3: Install and Configure Nginx

### 3.1 Install Nginx

```bash
sudo yum install -y nginx
```

### 3.2 Start and Enable Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3.3 Configure Firewall

```bash
# If firewalld is running
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Or if using iptables
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo service iptables save
```

---

## Step 4: Install PM2 (Process Manager)

### 4.1 Install PM2 Globally

```bash
sudo npm install -g pm2
```

### 4.2 Configure PM2 to Start on Boot

```bash
pm2 startup systemd
# Follow the instructions shown in the output
```

---

## Step 5: Install SSL Certificate (Let's Encrypt)

### 5.1 Install Certbot

```bash
sudo yum install -y certbot python3-certbot-nginx
```

### 5.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d darulquranfoundation.org -d www.darulquranfoundation.org
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 5.3 Auto-renewal Setup

Certbot automatically sets up auto-renewal. Test it:

```bash
sudo certbot renew --dry-run
```

---

## Step 6: Deploy Your Application

### 6.1 Create Application Directory

```bash
sudo mkdir -p /var/www/darulquran-frontend
sudo chown -R $USER:$USER /var/www/darulquran-frontend
```

### 6.2 Clone Your Repository

```bash
cd /var/www/darulquran-frontend
git clone <your-repository-url> .

# Or if you're uploading files manually, use SCP/SFTP
```

### 6.3 Install Dependencies

```bash
cd /var/www/darulquran-frontend
npm install --production
```

---

## Step 7: Configure Environment Variables

### 7.1 Create .env.production File

```bash
cd /var/www/darulquran-frontend
nano .env.production
```

Add the following content (update with your actual values):

```env
AUTH_IDENTIFIER=admin@example.com
AUTH_PASS=YOUR_STRONG_PASSWORD
JWT_SECRET=YOUR_SUPER_SECRET_KEY
NEXT_PUBLIC_BASE_API=https://api.darulquranfoundation.org/api/v1
NEXT_PUBLIC_APP_URL=https://darulquranfoundation.org
NODE_ENV=production
```

**Important:** 
- Replace `YOUR_STRONG_PASSWORD` with a secure password
- Replace `YOUR_SUPER_SECRET_KEY` with a long random string
- Update `NEXT_PUBLIC_BASE_API` with your actual backend API URL
- Make sure the API URL uses HTTPS if your backend supports it

### 7.2 Secure the .env File

```bash
chmod 600 .env.production
```

---

## Step 8: Build the Application

### 8.1 Build Next.js Application

```bash
cd /var/www/darulquran-frontend
npm run build
```

This will create a `.next` directory with the optimized production build.

---

## Step 8.5: Update Next.js Config for Production (IMPORTANT)

Before building, you need to update `next.config.js` to support your production API domain for images.

### 8.5.1 Update Image Remote Patterns

Edit `next.config.js`:

```bash
cd /var/www/darulquran-frontend
nano next.config.js
```

Update the `images.remotePatterns` section to include your production API:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "5000",
      pathname: "/api/v1/uploads/**",
    },
    {
      protocol: "https",
      hostname: "api.darulquranfoundation.org",
      pathname: "/api/v1/uploads/**",
    },
  ],
},
```

Also, update the CSP `img-src` in the SECURITY_HEADERS to include your production API:

```javascript
"img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com http://localhost:5000 https://api.darulquranfoundation.org https://i.ytimg.com",
```

**Note:** Replace `api.darulquranfoundation.org` with your actual backend API domain if different.

---

## Step 9: Configure PM2

### 9.1 Create PM2 Ecosystem File

```bash
cd /var/www/darulquran-frontend
nano ecosystem.config.js
```

Add the following content:

```javascript
module.exports = {
  apps: [{
    name: 'darulquran-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/darulquran-frontend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/darulquran-frontend-error.log',
    out_file: '/var/log/pm2/darulquran-frontend-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

### 9.2 Create Log Directory

```bash
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

### 9.3 Start Application with PM2

```bash
cd /var/www/darulquran-frontend
pm2 start ecosystem.config.js
pm2 save
```

### 9.4 Check PM2 Status

```bash
pm2 status
pm2 logs darulquran-frontend
```

---

## Step 10: Configure Nginx Reverse Proxy

### 10.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/conf.d/darulquran.conf
```

Add the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name darulquranfoundation.org www.darulquranfoundation.org;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name darulquranfoundation.org www.darulquranfoundation.org;

    # SSL Configuration (Certbot will update these)
    ssl_certificate /etc/letsencrypt/live/darulquranfoundation.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/darulquranfoundation.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Proxy Settings
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;

    # Increase timeouts for Next.js
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Main location block
    location / {
        proxy_pass http://localhost:3000;
        proxy_redirect off;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Error pages
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### 10.2 Test Nginx Configuration

```bash
sudo nginx -t
```

### 10.3 Reload Nginx

```bash
sudo systemctl reload nginx
```

---

## Step 11: Update Next.js Configuration (if needed)

If your backend API is on a different domain, you may need to update `next.config.js` to allow images from your production API:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "api.darulquranfoundation.org",
      pathname: "/api/v1/uploads/**",
    },
  ],
},
```

Also update the `connect-src` in CSP headers if needed.

---

## Step 12: Verify Deployment

### 12.1 Check Application Status

```bash
pm2 status
pm2 logs darulquran-frontend --lines 50
```

### 12.2 Test the Website

1. Open your browser and visit: `https://darulquranfoundation.org`
2. Check browser console for any errors
3. Test key functionality (login, navigation, etc.)

### 12.3 Check Nginx Logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Step 13: Set Up Automatic Updates (Optional but Recommended)

### 13.1 Create Update Script

```bash
cd /var/www/darulquran-frontend
nano update.sh
```

Add the following:

```bash
#!/bin/bash

cd /var/www/darulquran-frontend

# Pull latest changes
git pull origin main

# Install dependencies
npm install --production

# Build application
npm run build

# Restart PM2
pm2 restart darulquran-frontend

echo "Deployment completed successfully!"
```

Make it executable:

```bash
chmod +x update.sh
```

### 13.2 Usage

```bash
./update.sh
```

---

## Step 14: Monitoring and Maintenance

### 14.1 PM2 Commands

```bash
# View logs
pm2 logs darulquran-frontend

# Restart application
pm2 restart darulquran-frontend

# Stop application
pm2 stop darulquran-frontend

# View monitoring
pm2 monit
```

### 14.2 System Resources

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
top
```

---

## Troubleshooting

### Application Not Starting

1. Check PM2 logs: `pm2 logs darulquran-frontend`
2. Verify environment variables: `cat .env.production`
3. Check Node.js version: `node --version` (should be 18+)
4. Verify build completed: `ls -la .next`

### 502 Bad Gateway

1. Check if PM2 is running: `pm2 status`
2. Check if Next.js is listening on port 3000: `netstat -tulpn | grep 3000`
3. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### SSL Certificate Issues

1. Check certificate status: `sudo certbot certificates`
2. Renew manually: `sudo certbot renew`
3. Verify Nginx SSL config: `sudo nginx -t`

### Build Errors

1. Clear Next.js cache: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check Node.js version compatibility

---

## Security Checklist

- [ ] Firewall configured (ports 80, 443 only)
- [ ] SSL certificate installed and auto-renewing
- [ ] Environment variables secured (`.env.production` with 600 permissions)
- [ ] PM2 running with proper user (not root)
- [ ] Nginx security headers configured
- [ ] Regular system updates scheduled
- [ ] Strong passwords and secrets in use
- [ ] SSH key authentication enabled (disable password auth)

---

## Additional Notes

1. **Backend API**: Make sure your backend API is accessible at the URL specified in `NEXT_PUBLIC_BASE_API`
2. **CORS**: Ensure your backend allows requests from `https://darulquranfoundation.org`
3. **Database**: If your app uses a database, ensure it's accessible from the VPS
4. **File Uploads**: If your app handles file uploads, ensure proper permissions on upload directories
5. **Backups**: Set up regular backups of your application and database

---

## Quick Reference Commands

```bash
# Restart application
pm2 restart darulquran-frontend

# View logs
pm2 logs darulquran-frontend

# Reload Nginx
sudo systemctl reload nginx

# Check SSL certificate
sudo certbot certificates

# Update application
cd /var/www/darulquran-frontend && git pull && npm install --production && npm run build && pm2 restart darulquran-frontend
```

---

## Support

If you encounter any issues during deployment, check:
1. PM2 logs: `pm2 logs darulquran-frontend`
2. Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. System logs: `sudo journalctl -xe`

---

**Last Updated:** $(date)
**Deployment Target:** CentOS VPS
**Domain:** darulquranfoundation.org

