import { KeycloakOptions } from 'keycloak-angular';
import { environment } from './environments/environment';

// Keycloak configuration with PKCE and refresh token strategy
export const keycloakConfig: KeycloakOptions = {
  config: {
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId,
  },
  initOptions: {
    onLoad: 'check-sso',
    flow: 'standard',
    pkceMethod: 'S256', // Enable PKCE for better security
    checkLoginIframe: false,
    // Removed silentCheckSsoRedirectUri - using refresh tokens instead
  },
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer',
  bearerExcludedUrls: ['/assets'],
  shouldAddToken: () => true,
  shouldUpdateToken: () => true,
};
