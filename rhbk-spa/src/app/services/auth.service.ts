import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) { }

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
  login() {
    this.keycloakService.login();
  }

  /**
   * Logout user
   */
  logout() {
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
}
