import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container">
      <div class="teacher-profile">
        <div class="profile-header">
          <div class="avatar">
            <mat-icon>account_circle</mat-icon>
          </div>
          <div class="profile-info">
            <h1>{{ teacher.firstName }} {{ teacher.lastName }}</h1>
            <p class="subject">{{ teacher.subject }}</p>
            <p class="location" *ngIf="teacher.address">{{ teacher.address }}</p>
          </div>
        </div>
        
        <div class="profile-content">
          <mat-card class="bio-card">
            <mat-card-header>
              <mat-card-title>À propos</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{ teacher.bio }}</p>
            </mat-card-content>
          </mat-card>
          
          <mat-card class="courses-card">
            <mat-card-header>
              <mat-card-title>Ses cours</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="courses-list">
                <div class="course-item" *ngFor="let course of teacher.courses">
                  <h3>{{ course.title }}</h3>
                  <p>{{ course.description }}</p>
                  <div class="course-meta">
                    <span class="price">{{ course.pricePerHour }}€/h</span>
                    <span class="level">{{ course.level }}</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
        
        <div class="profile-actions">
          <button mat-raised-button color="primary">
            Réserver un cours
          </button>
          <button mat-stroked-button routerLink="/courses">
            Voir tous les cours
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .teacher-profile {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .profile-header {
      display: flex;
      align-items: center;
      gap: 30px;
      margin-bottom: 40px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .avatar mat-icon {
      font-size: 4rem;
      color: #1976d2;
    }
    
    .profile-info h1 {
      margin: 0 0 10px 0;
      color: #333;
    }
    
    .subject {
      font-size: 1.2rem;
      color: #1976d2;
      margin: 0 0 5px 0;
    }
    
    .location {
      color: #666;
      margin: 0;
    }
    
    .profile-content {
      display: grid;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .courses-list {
      display: grid;
      gap: 15px;
    }
    
    .course-item {
      padding: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    
    .course-item h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    
    .course-item p {
      color: #666;
      margin: 0 0 10px 0;
    }
    
    .course-meta {
      display: flex;
      gap: 15px;
    }
    
    .price {
      font-weight: bold;
      color: #1976d2;
    }
    
    .level {
      background: #f5f5f5;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9rem;
    }
    
    .profile-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
    }
    
    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }
      
      .profile-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class TeacherDetailComponent {
  teacher = {
    id: 1,
    firstName: 'Mathieu',
    lastName: 'Dubois',
    subject: 'Mathématiques',
    bio: 'Professeur de mathématiques expérimenté avec 10 ans d\'expérience. Spécialisé en algèbre et géométrie.',
    hourlyRate: 35,
    address: 'Paris, France',
    courses: [
      {
        title: 'Mathématiques - Niveau Lycée',
        description: 'Cours de mathématiques pour lycéens. Algèbre, géométrie, trigonométrie.',
        pricePerHour: 35,
        level: 'Lycée'
      },
      {
        title: 'Préparation Bac Mathématiques',
        description: 'Révision intensive pour le bac de mathématiques.',
        pricePerHour: 40,
        level: 'Terminale'
      }
    ]
  };
}
