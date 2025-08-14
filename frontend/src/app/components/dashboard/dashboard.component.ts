import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container">
      <h1 class="page-title">Tableau de bord</h1>
      
      <div class="dashboard-grid">
        <mat-card class="stats-card">
          <mat-card-header>
            <mat-card-title>Mes cours réservés</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">3</div>
            <p>Cours à venir</p>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stats-card">
          <mat-card-header>
            <mat-card-title>Cours terminés</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">12</div>
            <p>Cours effectués</p>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stats-card">
          <mat-card-header>
            <mat-card-title>Total dépensé</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">450€</div>
            <p>Cette année</p>
          </mat-card-content>
        </mat-card>
      </div>
      
      <mat-card class="recent-bookings">
        <mat-card-header>
          <mat-card-title>Réservations récentes</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="booking-item" *ngFor="let booking of recentBookings">
            <div class="booking-info">
              <h3>{{ booking.courseTitle }}</h3>
              <p>{{ booking.teacherName }}</p>
              <p>{{ booking.date }} à {{ booking.time }}</p>
            </div>
            <div class="booking-status">
              <span class="status {{ booking.status }}">{{ booking.statusText }}</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .stats-card {
      text-align: center;
      padding: 20px;
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #1976d2;
      margin-bottom: 10px;
    }
    
    .recent-bookings {
      margin-top: 20px;
    }
    
    .booking-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .booking-item:last-child {
      border-bottom: none;
    }
    
    .booking-info h3 {
      margin: 0 0 5px 0;
      color: #333;
    }
    
    .booking-info p {
      margin: 0;
      color: #666;
    }
    
    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .status.confirmed {
      background: #e8f5e8;
      color: #4caf50;
    }
    
    .status.pending {
      background: #fff3e0;
      color: #ff9800;
    }
    
    .status.completed {
      background: #f3e5f5;
      color: #9c27b0;
    }
  `]
})
export class DashboardComponent {
  recentBookings = [
    {
      courseTitle: 'Mathématiques - Niveau Lycée',
      teacherName: 'Mathieu Dubois',
      date: '15 Jan 2024',
      time: '14:00',
      status: 'confirmed',
      statusText: 'Confirmé'
    },
    {
      courseTitle: 'Français - Expression écrite',
      teacherName: 'Sophie Martin',
      date: '18 Jan 2024',
      time: '16:00',
      status: 'pending',
      statusText: 'En attente'
    },
    {
      courseTitle: 'Anglais - Conversation',
      teacherName: 'Pierre Leroy',
      date: '12 Jan 2024',
      time: '10:00',
      status: 'completed',
      statusText: 'Terminé'
    }
  ];
}
