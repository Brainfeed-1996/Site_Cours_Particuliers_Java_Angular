import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CourseService, Course } from '../../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <div class="container">
      <div class="loading-spinner" *ngIf="isLoading">
        <mat-spinner></mat-spinner>
      </div>
      
      <div class="course-detail" *ngIf="!isLoading && course">
        <div class="course-header">
          <h1 class="course-title">{{ course.title }}</h1>
          <div class="course-meta">
            <span class="subject">{{ course.subject }}</span>
            <span class="level">{{ course.level }}</span>
          </div>
        </div>
        
        <div class="course-content">
          <div class="main-info">
            <mat-card class="description-card">
              <mat-card-header>
                <mat-card-title>Description du cours</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>{{ course.description }}</p>
              </mat-card-content>
            </mat-card>
            
            <mat-card class="details-card">
              <mat-card-header>
                <mat-card-title>Détails du cours</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="detail-item">
                  <mat-icon>euro</mat-icon>
                  <span class="detail-label">Prix :</span>
                  <span class="detail-value">{{ course.pricePerHour }}€/heure</span>
                </div>
                
                <div class="detail-item">
                  <mat-icon>schedule</mat-icon>
                  <span class="detail-label">Format :</span>
                  <div class="format-options">
                    <mat-chip *ngIf="course.online" color="primary" selected>
                      <mat-icon>computer</mat-icon>
                      En ligne
                    </mat-chip>
                    <mat-chip *ngIf="course.inPerson" color="accent" selected>
                      <mat-icon>location_on</mat-icon>
                      Présentiel
                    </mat-chip>
                  </div>
                </div>
                
                <div class="detail-item" *ngIf="course.location">
                  <mat-icon>location_on</mat-icon>
                  <span class="detail-label">Lieu :</span>
                  <span class="detail-value">{{ course.location }}</span>
                </div>
                
                <div class="detail-item" *ngIf="course.requirements">
                  <mat-icon>assignment</mat-icon>
                  <span class="detail-label">Prérequis :</span>
                  <span class="detail-value">{{ course.requirements }}</span>
                </div>
                
                <div class="detail-item" *ngIf="course.materials">
                  <mat-icon>school</mat-icon>
                  <span class="detail-label">Matériel :</span>
                  <span class="detail-value">{{ course.materials }}</span>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
          
          <div class="teacher-info">
            <mat-card class="teacher-card">
              <mat-card-header>
                <mat-card-title>Le professeur</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="teacher-profile">
                  <div class="teacher-avatar">
                    <mat-icon>account_circle</mat-icon>
                  </div>
                  <div class="teacher-details">
                    <h3>{{ course.teacher.firstName }} {{ course.teacher.lastName }}</h3>
                    <p *ngIf="course.teacher.bio">{{ course.teacher.bio }}</p>
                    <div class="teacher-meta">
                      <span *ngIf="course.teacher.hourlyRate">Tarif moyen : {{ course.teacher.hourlyRate }}€/h</span>
                    </div>
                  </div>
                </div>
                <mat-divider></mat-divider>
                <div class="teacher-actions">
                  <button mat-raised-button color="primary" [routerLink]="['/teachers', course.teacher.id]">
                    Voir le profil complet
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
        
        <div class="course-actions">
          <button mat-raised-button color="primary" class="book-btn">
            <mat-icon>book_online</mat-icon>
            Réserver ce cours
          </button>
          <button mat-stroked-button [routerLink]="['/teachers', course.teacher.id]">
            <mat-icon>person</mat-icon>
            Voir tous les cours de ce professeur
          </button>
        </div>
      </div>
      
      <div class="error-message" *ngIf="!isLoading && !course">
        <mat-icon>error</mat-icon>
        <h3>Cours non trouvé</h3>
        <p>Le cours que vous recherchez n'existe pas ou a été supprimé.</p>
        <button mat-raised-button color="primary" routerLink="/courses">
          Retour aux cours
        </button>
      </div>
    </div>
  `,
  styles: [
    `
    .course-detail { max-width: 1000px; margin: 0 auto; }
    .course-header { text-align: center; margin-bottom: 40px; }
    .course-title { font-size: 2.5rem; color: #333; margin-bottom: 15px; font-weight: 300; }
    .course-meta { display: flex; justify-content: center; gap: 20px; }
    .subject, .level { background: #1976d2; color: white; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; }
    .course-content { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-bottom: 40px; }
    .description-card, .details-card, .teacher-card { margin-bottom: 20px; }
    .detail-item { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding: 10px 0; }
    .detail-item mat-icon { color: #1976d2; }
    .detail-label { font-weight: 500; color: #333; min-width: 80px; }
    .detail-value { color: #666; flex: 1; }
    .format-options { display: flex; gap: 10px; }
    .teacher-profile { display: flex; gap: 20px; align-items: flex-start; margin-bottom: 20px; }
    .teacher-avatar mat-icon { font-size: 3rem; color: #1976d2; }
    .teacher-details h3 { margin: 0 0 10px 0; color: #333; }
    .teacher-details p { color: #666; line-height: 1.6; margin-bottom: 10px; }
    .teacher-meta { color: #1976d2; font-weight: 500; }
    .teacher-actions { padding-top: 20px; text-align: center; }
    .course-actions { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .book-btn { padding: 12px 30px; font-size: 1.1rem; }
    .error-message { text-align: center; padding: 60px 20px; color: #666; }
    .error-message mat-icon { font-size: 4rem; color: #f44336; margin-bottom: 20px; }
    .error-message h3 { margin-bottom: 10px; color: #333; }
    @media (max-width: 768px) { .course-content { grid-template-columns: 1fr; gap: 20px; } .course-title { font-size: 2rem; } .course-meta { flex-direction: column; align-items: center; gap: 10px; } .course-actions { flex-direction: column; align-items: center; } .teacher-profile { flex-direction: column; text-align: center; } }
    `
  ]
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.isLoading = true;
      this.courseService.getCourseById(+courseId).subscribe({
        next: (course: Course) => {
          this.course = course;
          this.isLoading = false;
        },
        error: (error: unknown) => {
          console.error('Erreur lors du chargement du cours:', error);
          this.isLoading = false;
        }
      });
    }
  }
}
