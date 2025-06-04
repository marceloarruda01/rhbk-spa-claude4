# Environment Configuration

This project is configured to work with different environments for Keycloak authentication.

## Available Environments

### Development
- **Keycloak URL**: `https://sso-dev.apps.opshifthomol.cjf.jus.br`
- **File**: `src/environments/environment.ts`
- **Production flag**: `false`

### Staging
- **Keycloak URL**: `https://sso-hmg.cjf.jus.br/`
- **File**: `src/environments/environment.staging.ts`
- **Production flag**: `false`

### Production
- **Keycloak URL**: `https://sso-2.cjf.jus.br/`
- **File**: `src/environments/environment.production.ts`
- **Production flag**: `true`

## Running the Application

### Development Environment (default)
```bash
npm start
# or
ng serve
```

### Staging Environment
```bash
npm run start:staging
# or
ng serve --configuration=staging
```

### Production Environment
```bash
npm run start:production
# or
ng serve --configuration=production
```

## Building the Application

### Development Build
```bash
npm run build
# or
ng build
```

### Staging Build
```bash
npm run build:staging
# or
ng build --configuration=staging
```

### Production Build
```bash
npm run build:production
# or
ng build --configuration=production
```

## Configuration Details

The Keycloak configuration is now dynamically loaded from the environment files. Each environment file contains:

```typescript
export const environment = {
  production: boolean,
  keycloak: {
    url: string,        // Keycloak server URL
    realm: string,      // Keycloak realm name
    clientId: string,   // Keycloak client ID
  }
};
```

The main Keycloak configuration (`src/keycloak.config.ts`) imports the environment and uses the appropriate settings based on the build configuration.
