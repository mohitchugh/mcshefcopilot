# Deployment Guide for McShef.com

## Prerequisites for Deployment

### 1. Okta Setup
1. Create an Okta developer account at https://developer.okta.com
2. Create a new **Single Page Application** in your Okta dashboard
3. Configure the application:
   - **Application Type**: Single Page App (SPA)
   - **Grant Types**: Authorization Code, Refresh Token
   - **Sign-in redirect URIs**: 
     - Development: `http://localhost:3000/login/callback`
     - Production: `https://yourdomain.com/login/callback`
   - **Sign-out redirect URIs**:
     - Development: `http://localhost:3000`
     - Production: `https://yourdomain.com`
   - **Trusted Origins**: Add your domain for both redirect and CORS
4. Note your:
   - Client ID
   - Okta domain (e.g., `dev-12345678.okta.com`)
   - Issuer URL (e.g., `https://dev-12345678.okta.com/oauth2/default`)

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_OKTA_CLIENT_ID=your_actual_client_id
REACT_APP_OKTA_ISSUER=https://your-okta-domain/oauth2/default
```

**Important**: Never commit the `.env` file to version control!

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# The app will open at http://localhost:3000
```

## Production Build

```bash
# Create optimized production build
npm run build

# The build files will be in the /build directory
```

## Deployment Options

### Option 1: Netlify (Recommended for SPA)

1. **Connect Repository**:
   - Login to Netlify
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Set Environment Variables**:
   - Go to Site settings → Build & deploy → Environment
   - Add `REACT_APP_OKTA_CLIENT_ID`
   - Add `REACT_APP_OKTA_ISSUER`

4. **Update Okta Configuration**:
   - Add your Netlify URL to Okta redirect URIs
   - Add to Trusted Origins

5. **Deploy**: Netlify will auto-deploy on git push

### Option 2: Vercel

1. **Import Project**:
   - Login to Vercel
   - Click "New Project"
   - Import from GitHub

2. **Configure**:
   - Framework Preset: Create React App
   - Build command: `npm run build`
   - Output directory: `build`

3. **Environment Variables**:
   - Add Okta credentials in project settings

4. **Update Okta**: Add Vercel domain to Okta

### Option 3: AWS S3 + CloudFront

1. **Build**:
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**:
   - Enable static website hosting
   - Upload build folder contents

3. **CloudFront Distribution**:
   - Create distribution for S3 bucket
   - Enable HTTPS
   - Set default root object to `index.html`
   - Configure error pages to serve `index.html` (for SPA routing)

4. **Environment Variables**:
   - Build with environment variables set
   - Or use AWS Systems Manager Parameter Store

5. **Update Okta**: Add CloudFront URL to Okta

### Option 4: Traditional Web Server

1. **Build**:
   ```bash
   npm run build
   ```

2. **Server Configuration**:
   - Serve from `build` directory
   - Configure server for SPA routing (all routes → index.html)
   
3. **Nginx Example**:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     root /path/to/build;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

4. **Apache Example** (.htaccess):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Post-Deployment Checklist

- [ ] Okta redirect URIs updated with production URL
- [ ] Okta Trusted Origins configured for production domain
- [ ] Environment variables set in deployment platform
- [ ] HTTPS enabled (required for OAuth)
- [ ] Test login flow in production
- [ ] Test chef portal functionality
- [ ] Test customer portal functionality
- [ ] Verify meal creation and ordering
- [ ] Check responsive design on mobile devices
- [ ] Monitor browser console for errors

## Backend Integration (Future)

Currently, the app uses localStorage for demo purposes. For production:

1. **API Development**:
   - Create REST or GraphQL API
   - Implement endpoints for meals, orders, users
   - Add authentication middleware

2. **Database**:
   - PostgreSQL or MongoDB for data persistence
   - Schema for users, meals, orders, reviews

3. **File Storage**:
   - AWS S3 or Cloudinary for meal images
   - Update form to handle file uploads

4. **Payment Processing**:
   - Integrate Stripe or PayPal
   - Implement secure payment flow
   - Handle revenue split (40/60)

5. **Real-time Features**:
   - WebSockets for live updates
   - Notifications for new orders
   - Inventory updates

6. **Update Frontend**:
   - Replace localStorage with API calls
   - Add error handling and loading states
   - Implement retry logic

## Monitoring & Maintenance

### Recommended Tools:
- **Analytics**: Google Analytics, Mixpanel
- **Error Tracking**: Sentry, LogRocket
- **Performance**: Lighthouse, Web Vitals
- **Uptime**: Pingdom, UptimeRobot

### Regular Maintenance:
- Update dependencies monthly
- Security audit with `npm audit`
- Performance optimization
- User feedback implementation
- A/B testing for conversions

## Security Considerations

1. **Environment Variables**: Never commit credentials
2. **HTTPS Only**: OAuth requires secure connections
3. **Content Security Policy**: Add CSP headers
4. **Rate Limiting**: Implement on backend
5. **Input Validation**: Validate all user inputs
6. **XSS Protection**: Already handled by React
7. **CSRF Protection**: Implement for state-changing operations

## Support & Documentation

- **User Guide**: Create guides for chefs and customers
- **FAQ**: Common questions and answers
- **Support Channel**: Email or chat support
- **Status Page**: Service status and incidents
- **API Docs**: When backend is added

## Scaling Considerations

As the platform grows:
1. CDN for static assets
2. Database read replicas
3. Caching layer (Redis)
4. Load balancing
5. Microservices architecture
6. Queue system for orders
7. Search engine (Elasticsearch)
8. Analytics pipeline

## Legal & Compliance

Before launch:
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Cookie Policy
- [ ] Food safety compliance
- [ ] Business licenses
- [ ] Insurance coverage
- [ ] Payment processing agreements
- [ ] Data protection compliance (GDPR, CCPA)

## Cost Estimation

### Monthly (Estimated)
- **Hosting**: $0-50 (Netlify/Vercel free tier)
- **Okta**: Free up to 1,000 users
- **Domain**: $10-15/year
- **SSL**: Free (Let's Encrypt)

### With Backend:
- **Database**: $20-100
- **API Hosting**: $10-50
- **File Storage**: $5-20
- **Payment Processing**: 2.9% + $0.30 per transaction
- **Monitoring**: $0-50

Total: ~$50-300/month depending on scale
