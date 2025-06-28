# RHBK SPA - Red Hat Build of Keycloak Angular 20 Test Application

A modern Angular 20 Single Page Application (SPA) designed to test and demonstrate SSO (Single Sign-On) integration with Red Hat Build of Keycloak (RHBK).

## 🚀 Features

- **Angular 20** with the latest features and performance improvements
- **Keycloak Integration** using `keycloak-angular` adapter
- **SSO Authentication** with login, logout, and token management
- **Route Protection** with authentication guards
- **Responsive Design** with modern CSS styling
- **User Profile Management** displaying user information and roles
- **Docker Support** for easy Keycloak deployment
- **Automated Setup** script for quick environment configuration

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Docker and Docker Compose (for running Keycloak)
- Angular CLI (optional, for development)

## 🛠️ Installation

### Quick Setup (Automated)

Run the automated setup script to configure everything:

```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Keycloak:**
   - Edit `src/keycloak.config.ts` with your Keycloak server details
   - Update realm, clientId, and server URL as needed

3. **Start Keycloak (using Docker):**
   ```bash
   docker-compose up -d
   ```

4. **Configure Keycloak realm and client** (see SETUP.md for detailed instructions)

## 🔧 Configuration

### Keycloak Configuration

Edit `src/keycloak.config.ts`:

```typescript
export const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'rhbk-test',
  clientId: 'rhbk-spa-client'
};
```

### Environment Variables

The application supports different environments. Update the configuration in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

## 🚀 Development

### Start Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Build for Production

```bash
ng build --configuration=production
```

Build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
rhbk-spa/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/          # Login component
│   │   │   ├── dashboard/      # Protected dashboard
│   │   │   └── profile/        # User profile page
│   │   ├── guards/
│   │   │   └── auth.guard.ts   # Route protection
│   │   ├── services/
│   │   │   └── auth.service.ts # Authentication service
│   │   ├── app.config.ts       # App configuration
│   │   └── app.routes.ts       # Routing configuration
│   ├── keycloak.config.ts      # Keycloak configuration
│   └── styles.css              # Global styles
├── public/
│   └── assets/
│       └── silent-check-sso.html  # Keycloak silent SSO
├── docker-compose.yml          # Keycloak Docker setup
├── setup.sh                   # Automated setup script
└── SETUP.md                   # Detailed setup instructions
```

## 🔐 Authentication Flow

1. **Unauthenticated users** are redirected to the login page
2. **Login page** provides SSO login button
3. **Successful authentication** redirects to the dashboard
4. **Protected routes** require authentication (dashboard, profile)
5. **Token management** handles refresh and expiration
6. **Logout** clears session and redirects to login

## 🎨 UI Components

### Login Component
- Clean, modern login interface
- SSO login integration
- Responsive design

### Dashboard
- User information display
- Token status and expiration
- Navigation to other sections

### Profile
- Detailed user information
- Role and permission display
- Token management options

## 🐳 Docker Support

### Start Keycloak with Docker Compose

```bash
docker-compose up -d
```

This will start Keycloak on `http://localhost:8080` with:
- Admin credentials: `admin/admin`
- H2 database for development
- Persistent data volume

### Stop Keycloak

```bash
docker-compose down
```

## 📚 API Reference

### AuthService Methods

- `login()` - Initiate login flow
- `logout()` - Logout and clear session
- `isAuthenticated()` - Check authentication status
- `getUserInfo()` - Get user profile information
- `hasRole(role: string)` - Check user roles
- `getToken()` - Get access token
- `refreshToken()` - Refresh access token

## 🧪 Testing

### Unit Tests

```bash
ng test
```

### End-to-End Tests

```bash
ng e2e
```

## 🛠️ Troubleshooting

### Common Issues

1. **CORS errors**: Ensure Keycloak client has correct origins configured
2. **Token expiration**: Check token refresh configuration
3. **Authentication loops**: Verify redirect URIs in Keycloak client
4. **Docker issues**: Ensure Docker is running and ports are available

### Debug Mode

Enable debug logging in `keycloak.config.ts`:

```typescript
export const keycloakConfig = {
  // ... other config
  enableLogging: true
};
```

## 📖 Additional Documentation

- [SETUP.md](./SETUP.md) - Detailed setup and configuration guide
- [Keycloak Angular Documentation](https://www.npmjs.com/package/keycloak-angular)
- [Angular 20 Documentation](https://angular.dev/)
- [Red Hat Build of Keycloak](https://access.redhat.com/products/red-hat-build-of-keycloak)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the setup documentation
3. Check Keycloak logs: `docker-compose logs keycloak`
4. Verify Angular console for errors
