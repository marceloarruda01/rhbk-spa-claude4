import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: string = '';
  userRoles: string[] = [];
  isTokenExpired: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (this.authService.isAuthenticated()) {
      this.username = this.authService.getUsername();
      this.userRoles = this.authService.getUserRoles();
      this.isTokenExpired = this.authService.isTokenExpired();
    }
  }

  logout() {
    this.authService.logout();
  }

  updateToken() {
    this.authService.updateToken().then((refreshed) => {
      if (refreshed) {
        console.log('Token updated successfully');
        this.isTokenExpired = false;
      }
    });
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
}
