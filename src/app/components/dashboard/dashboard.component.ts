import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  username: string = '';
  userRoles: string[] = [];
  isTokenExpired: boolean = false;
  tokenExpiryTime: number = 0;
  timeUntilExpiry: number = 0;
  private interval: number | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUserInfo();
    this.startTokenExpiryTimer();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  loadUserInfo() {
    if (this.authService.isAuthenticated()) {
      this.username = this.authService.getUsername();
      this.userRoles = this.authService.getUserRoles();
      this.isTokenExpired = this.authService.isTokenExpired();
      this.tokenExpiryTime = this.authService.getTokenExpirationTime();
      this.timeUntilExpiry = this.authService.getTimeUntilTokenExpiry();
    }
  }

  startTokenExpiryTimer() {
    this.interval = window.setInterval(() => {
      if (this.authService.isAuthenticated()) {
        this.timeUntilExpiry = this.authService.getTimeUntilTokenExpiry();
        this.isTokenExpired = this.authService.isTokenExpired();
      }
    }, 1000);
  }

  logout() {
    this.authService.logout();
  }

  async updateToken() {
    try {
      const refreshed = await this.authService.updateToken();
      if (refreshed) {
        console.log('Token updated successfully');
        this.loadUserInfo(); // Refresh the token info display
      }
    } catch (error) {
      console.error('Token update failed:', error);
    }
  }

  async forceRefreshToken() {
    try {
      const refreshed = await this.authService.forceTokenRefresh();
      console.log('Force refresh result:', refreshed);
      this.loadUserInfo(); // Refresh the token info display
    } catch (error) {
      console.error('Force refresh failed:', error);
      alert('Token refresh failed. You may need to login again.');
    }
  }

  async showToken() {
    try {
      const token = await this.authService.getToken();
      alert('Access Token (check console for full token)');
      console.log('Access Token:', token);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  }

  formatTime(seconds: number): string {
    if (seconds <= 0) return 'Expired';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }
}
