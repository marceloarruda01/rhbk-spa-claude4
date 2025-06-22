# RHBK SPA Demo

An Angular 19 Single Page Application (SPA) that demonstrates SSO login integration with Red Hat Build of Keycloak (RHBK).

## Features

- ✅ Angular 19 with standalone components
- ✅ Keycloak authentication integration
- ✅ JWT token management
- ✅ Protected routes with auth guards
- ✅ User profile management
- ✅ Role-based access control
- ✅ Silent token refresh
- ✅ Modern responsive UI

## Prerequisites

Before running this application, you need to have a Red Hat Build of Keycloak (RHBK) server running. You can set it up using either:

### Option 1: Local Keycloak (for testing)
```bash
# Download and run Keycloak locally
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
```

### Option 2: Red Hat Build of Keycloak
Set up RHBK according to Red Hat documentation.

## Keycloak Configuration

1. **Access Keycloak Admin Console**: http://localhost:8080 (admin/admin)

2. **Create a Realm**:
   - Click "Create Realm"
   - Set realm name: `demo`
   - Click "Create"

3. **Create a Client**:
   - Go to "Clients" → "Create client"
   - Client ID: `rhbk-spa-client`
   - Client type: `OpenID Connect`
   - Click "Next"
   - Client authentication: `Off` (public client)
   - Standard flow: `Enabled`
   - Direct access grants: `Enabled`
   - Click "Save"

4. **Configure Client Settings**:
   - Valid redirect URIs: `http://localhost:4200/*`
   - Valid post logout redirect URIs: `http://localhost:4200/*`
   - Web origins: `http://localhost:4200`

5. **Create a Test User**:
   - Go to "Users" → "Add user"
   - Username: `testuser`
   - Email: `testuser@example.com`
   - First name: `Test`
   - Last name: `User`
   - Click "Create"
   - Go to "Credentials" tab
   - Set password: `password`
   - Temporary: `Off`
   - Click "Set password"

## Application Configuration

Update the Keycloak configuration in `src/keycloak.config.ts`:

```typescript
export const keycloakConfig: KeycloakOptions = {
  config: {
    url: 'http://localhost:8080', // Your RHBK server URL
    realm: 'demo', // Your realm name
    clientId: 'rhbk-spa-client', // Your client ID
  },
  // ... other settings
};
```

## Installation and Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open the application**:
   Navigate to `http://localhost:4200`

## Application Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Login page with SSO integration
│   │   ├── dashboard/      # Protected dashboard
│   │   └── profile/        # User profile management
│   ├── guards/
│   │   └── auth.guard.ts   # Route protection
│   ├── services/
│   │   └── auth.service.ts # Authentication service
│   └── ...
├── keycloak.config.ts      # Keycloak configuration
└── ...
```

## Usage

1. **Login**: Navigate to the app and click "Login with RHBK"
2. **Dashboard**: After authentication, you'll be redirected to the dashboard
3. **Profile**: View and manage user profile information
4. **Logout**: Use the logout button to end the session

## Key Features Demonstrated

### Authentication Flow
- Authorization Code Flow with PKCE
- Silent token refresh
- Logout handling

### Token Management
- Access token retrieval
- Token validation
- Automatic token refresh

### Route Protection
- Auth guards for protected routes
- Automatic redirect to login

### User Management
- User profile access
- Role-based permissions
- User attributes display

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure web origins are configured in Keycloak client settings
2. **Redirect Issues**: Check valid redirect URIs match your application URL
3. **Token Errors**: Verify client configuration and user credentials

### Debug Mode
Enable debug logging by opening browser console to see Keycloak events and token information.

## Production Considerations

For production deployment:

1. **HTTPS**: Use HTTPS for both Keycloak and the application
2. **Environment Configuration**: Use environment-specific configuration files
3. **Security Headers**: Implement proper security headers
4. **Token Storage**: Consider secure token storage options
5. **Error Handling**: Implement comprehensive error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
