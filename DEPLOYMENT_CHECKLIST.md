# Quick Deployment Checklist
## DarulQuran Foundation Frontend - CentOS VPS

Use this checklist to ensure all steps are completed during deployment.

---

## Pre-Deployment

- [ ] VPS server ready with CentOS installed
- [ ] Domain `darulquranfoundation.org` DNS pointing to VPS IP
- [ ] SSH access to server configured
- [ ] Repository access (Git credentials or SSH keys)

---

## Server Setup

- [ ] System packages updated (`sudo yum update -y`)
- [ ] Node.js 20.x installed and verified
- [ ] Nginx installed and running
- [ ] Firewall configured (ports 80, 443 open)
- [ ] PM2 installed globally

---

## SSL Certificate

- [ ] Certbot installed
- [ ] SSL certificate obtained for domain
- [ ] Auto-renewal tested (`sudo certbot renew --dry-run`)

---

## Application Deployment

- [ ] Application directory created (`/var/www/darulquran-frontend`)
- [ ] Repository cloned or files uploaded
- [ ] Dependencies installed (`npm install --production`)
- [ ] `.env.production` file created with correct values:
  - [ ] `AUTH_IDENTIFIER` set
  - [ ] `AUTH_PASS` set (strong password)
  - [ ] `JWT_SECRET` set (long random string)
  - [ ] `NEXT_PUBLIC_BASE_API` set to production API URL
  - [ ] `NEXT_PUBLIC_APP_URL` set to `https://darulquranfoundation.org`
  - [ ] `NODE_ENV` set to `production`
- [ ] `.env.production` permissions set to 600
- [ ] `next.config.js` updated for production (image domains, CSP headers)
- [ ] Application built successfully (`npm run build`)

---

## PM2 Configuration

- [ ] `ecosystem.config.js` created
- [ ] PM2 log directory created (`/var/log/pm2`)
- [ ] Application started with PM2
- [ ] PM2 startup script configured
- [ ] PM2 status verified (`pm2 status`)

---

## Nginx Configuration

- [ ] Nginx config file created (`/etc/nginx/conf.d/darulquran.conf`)
- [ ] HTTP to HTTPS redirect configured
- [ ] SSL certificates configured in Nginx
- [ ] Reverse proxy to port 3000 configured
- [ ] Security headers added
- [ ] Gzip compression enabled
- [ ] Nginx config tested (`sudo nginx -t`)
- [ ] Nginx reloaded (`sudo systemctl reload nginx`)

---

## Verification

- [ ] Website accessible at `https://darulquranfoundation.org`
- [ ] HTTPS working (no mixed content warnings)
- [ ] No console errors in browser
- [ ] Key functionality tested (navigation, login, etc.)
- [ ] PM2 logs checked (no errors)
- [ ] Nginx logs checked (no errors)
- [ ] Application restarts automatically after server reboot

---

## Post-Deployment

- [ ] Update script created and tested (`update.sh`)
- [ ] Backup strategy planned
- [ ] Monitoring set up (optional: PM2 monitoring, uptime monitoring)
- [ ] Documentation updated with server details

---

## Security Checklist

- [ ] Firewall properly configured
- [ ] SSL certificate valid and auto-renewing
- [ ] Environment variables secured (600 permissions)
- [ ] PM2 running as non-root user
- [ ] Strong passwords/secrets in use
- [ ] SSH key authentication enabled (password auth disabled)
- [ ] Regular system updates scheduled

---

## Troubleshooting Commands Reference

```bash
# Check application status
pm2 status
pm2 logs darulquran-frontend

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check SSL certificate
sudo certbot certificates

# View logs
sudo tail -f /var/log/nginx/error.log
pm2 logs darulquran-frontend --lines 50

# Restart services
pm2 restart darulquran-frontend
sudo systemctl reload nginx
```

---

## Quick Update Process

When you need to update the application:

```bash
cd /var/www/darulquran-frontend
./update.sh
```

Or manually:

```bash
cd /var/www/darulquran-frontend
git pull
npm install --production
npm run build
pm2 restart darulquran-frontend
```

---

**Date Completed:** _______________
**Deployed By:** _______________
**Server IP:** _______________

