import { KeycloakOptions } from 'keycloak-angular';

// Keycloak configuration
export const keycloakConfig: KeycloakOptions = {
  config: {
    url: 'http://localhost:8080', // Your RHBK server URL
    realm: 'demo', // Your realm name
    clientId: 'rhbk-spa-client', // Your client ID
  },
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    checkLoginIframe: false,
  },
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer',
  bearerExcludedUrls: ['/assets'],
};
