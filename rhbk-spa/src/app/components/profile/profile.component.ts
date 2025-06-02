import { Component, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  emailVerified?: boolean;
  attributes?: any;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, KeyValuePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  userRoles: string[] = [];
  loading = true;
  error: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.loading = true;
      this.error = null;

      if (this.authService.isAuthenticated()) {
        this.userProfile = await this.authService.getUserDetails();
        this.userRoles = this.authService.getUserRoles();
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.error = 'Failed to load user profile';
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  getDisplayName(): string {
    if (!this.userProfile) return 'Unknown User';

    if (this.userProfile.firstName && this.userProfile.lastName) {
      return `${this.userProfile.firstName} ${this.userProfile.lastName}`;
    }

    return this.userProfile.username || 'Unknown User';
  }
}
