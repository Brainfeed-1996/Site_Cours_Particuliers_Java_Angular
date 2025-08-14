import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container">
      <h1 class="page-title">Nos professeurs</h1>
      <p class="text-center">Découvrez nos professeurs qualifiés et expérimentés</p>
      
      <div class="teachers-grid">
        <mat-card class="teacher-card" *ngFor="let teacher of teachers">
          <mat-card-header>
            <div class="teacher-avatar">
              <mat-icon>account_circle</mat-icon>
            </div>
            <mat-card-title>{{ teacher.firstName }} {{ teacher.lastName }}</mat-card-title>
            <mat-card-subtitle>{{ teacher.subject }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <p *ngIf="teacher.bio">{{ teacher.bio | slice:0:100 }}...</p>
            <div class="teacher-info">
              <span class="price">{{ teacher.hourlyRate }}€/h</span>
              <span class="location" *ngIf="teacher.address">{{ teacher.address }}</span>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button color="primary" [routerLink]="['/teachers', teacher.id]">
              Voir le profil
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .teachers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    
    .teacher-card {
      transition: transform 0.3s;
    }
    
    .teacher-card:hover {
      transform: translateY(-5px);
    }
    
    .teacher-avatar mat-icon {
      font-size: 3rem;
      color: #1976d2;
    }
    
    .teacher-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
    }
    
    .price {
      font-weight: bold;
      color: #1976d2;
      font-size: 1.1rem;
    }
    
    .location {
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class TeacherListComponent {
  teachers = [
    {
      id: 1,
      firstName: 'Mathieu',
      lastName: 'Dubois',
      subject: 'Mathématiques',
      bio: 'Professeur de mathématiques expérimenté avec 10 ans d\'expérience.',
      hourlyRate: 35,
      address: 'Paris, France'
    },
    {
      id: 2,
      firstName: 'Sophie',
      lastName: 'Martin',
      subject: 'Français',
      bio: 'Professeure de français passionnée. J\'aide les élèves à améliorer leur expression.',
      hourlyRate: 30,
      address: 'Lyon, France'
    }
  ];
}
