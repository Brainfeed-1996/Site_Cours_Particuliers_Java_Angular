import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container">
      <h1 class="page-title">Mon Profil</h1>
      
      <div class="profile-content">
        <mat-card class="profile-card">
          <mat-card-header>
            <div class="avatar">
              <mat-icon>account_circle</mat-icon>
            </div>
            <mat-card-title>{{ user.firstName }} {{ user.lastName }}</mat-card-title>
            <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="profile-details">
              <div class="detail-item">
                <mat-icon>email</mat-icon>
                <span>{{ user.email }}</span>
              </div>
              <div class="detail-item" *ngIf="user.phone">
                <mat-icon>phone</mat-icon>
                <span>{{ user.phone }}</span>
              </div>
              <div class="detail-item" *ngIf="user.address">
                <mat-icon>location_on</mat-icon>
                <span>{{ user.address }}</span>
              </div>
              <div class="detail-item" *ngIf="user.bio">
                <mat-icon>description</mat-icon>
                <span>{{ user.bio }}</span>
              </div>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button color="primary">
              Modifier le profil
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .profile-content {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .profile-card {
      padding: 20px;
    }
    
    .avatar mat-icon {
      font-size: 4rem;
      color: #1976d2;
    }
    
    .profile-details {
      margin-top: 20px;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      padding: 10px 0;
    }
    
    .detail-item mat-icon {
      color: #1976d2;
    }
    
    mat-card-actions {
      padding: 16px 0;
      text-align: center;
    }
  `]
})
export class ProfileComponent {
  user = {
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@email.com',
    phone: '06 67 89 01 23',
    address: 'Paris, France',
    bio: 'Élève en terminale S'
  };
}
