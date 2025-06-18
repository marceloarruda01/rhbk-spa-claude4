import { Injectable, OnDestroy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private tokenRefreshInterval: number | undefined;
  private readonly TOKEN_REFRESH_MARGIN = 30; // seconds before expiry
  private readonly CHECK_INTERVAL = 10000; // 10 seconds

  constructor(private keycloakService: KeycloakService) {
    this.setupTokenRefresh();
  }

  ngOnDestroy(): void {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
  }

  /**
   * Setup automatic token refresh
   */
  private setupTokenRefresh(): void {
    // Only setup refresh if user is authenticated
    if (this.isAuthenticated()) {
      this.startTokenRefreshTimer();
    }
  }

  /**
   * Start the token refresh timer
   */
  private startTokenRefreshTimer(): void {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }

    this.tokenRefreshInterval = window.setInterval(() => {
      this.checkAndRefreshToken();
    }, this.CHECK_INTERVAL);
  }

  /**
   * Check if token needs refresh and refresh if necessary
   */
  private async checkAndRefreshToken(): Promise<void> {
    if (!this.isAuthenticated()) {
      return;
    }

    try {
      // Check if token will expire in the next 30 seconds
      if (this.keycloakService.isTokenExpired(this.TOKEN_REFRESH_MARGIN)) {
        console.log('Token expiring soon, refreshing...');
        const refreshed = await this.keycloakService.updateToken(this.TOKEN_REFRESH_MARGIN);

        if (refreshed) {
          console.log('Token refreshed successfully');
        } else {
          console.log('Token still valid, no refresh needed');
        }
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      this.handleTokenRefreshFailure();
    }
  }

  /**
   * Handle token expiry
   */
  private handleTokenExpired(): void {
    console.log('Token has expired');
    this.updateToken().catch(() => {
      console.log('Token refresh failed, redirecting to login');
      this.login();
    });
  }

  /**
   * Handle token refresh failure
   */
  private handleTokenRefreshFailure(): void {
    console.log('Token refresh failed, user needs to login again');
    this.logout();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  /**
   * Get user details
   */
  getUserDetails() {
    return this.keycloakService.loadUserProfile();
  }

  /**
   * Get username
   */
  getUsername(): string {
    return this.keycloakService.getUsername();
  }

  /**
   * Get user roles
   */
  getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }

  /**
   * Login user
   */
  async login(): Promise<void> {
    await this.keycloakService.login();
    // Start token refresh after successful login
    this.startTokenRefreshTimer();
  }

  /**
   * Logout user
   */
  logout() {
    // Clear the refresh timer
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
    this.keycloakService.logout();
  }

  /**
   * Get access token
   */
  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string {
    return this.keycloakService.getKeycloakInstance().refreshToken || '';
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    return this.keycloakService.isTokenExpired();
  }

  /**
   * Update token
   */
  updateToken(): Promise<boolean> {
    return this.keycloakService.updateToken();
  }

  /**
   * Get token expiration time in seconds
   */
  getTokenExpirationTime(): number {
    const tokenParsed = this.keycloakService.getKeycloakInstance().tokenParsed;
    return tokenParsed?.exp || 0;
  }

  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilTokenExpiry(): number {
    const exp = this.getTokenExpirationTime();
    const now = Math.ceil(Date.now() / 1000);
    return Math.max(0, exp - now);
  }

  /**
   * Check if token will expire within specified seconds
   */
  isTokenExpiringWithin(seconds: number): boolean {
    return this.getTimeUntilTokenExpiry() <= seconds;
  }

  /**
   * Force token refresh
   */
  async forceTokenRefresh(): Promise<boolean> {
    try {
      console.log('Forcing token refresh...');
      const refreshed = await this.keycloakService.updateToken(-1); // Force refresh
      console.log('Token refresh result:', refreshed);
      return refreshed;
    } catch (error) {
      console.error('Force token refresh failed:', error);
      throw error;
    }
  }
}
