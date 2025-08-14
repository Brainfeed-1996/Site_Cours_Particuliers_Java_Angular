import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatDividerModule],
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <h1>Trouvez le professeur idéal pour vos cours particuliers</h1>
        <p>Des milliers de professeurs qualifiés dans tous les domaines, disponibles en ligne ou en présentiel</p>
        <div class="hero-buttons">
          <button mat-raised-button color="primary" routerLink="/courses" class="hero-btn">
            Découvrir les cours
          </button>
          <button mat-stroked-button routerLink="/register" class="hero-btn">
            Devenir professeur
          </button>
        </div>
      </div>
    </div>

    <div class="features-section">
      <div class="container">
        <h2>Pourquoi choisir notre plateforme ?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <mat-icon class="feature-icon">verified_user</mat-icon>
            <h3>Professeurs vérifiés</h3>
            <p>Tous nos professeurs sont vérifiés et qualifiés dans leur domaine d'expertise.</p>
          </div>
          <div class="feature-card">
            <mat-icon class="feature-icon">schedule</mat-icon>
            <h3>Flexibilité totale</h3>
            <p>Réservez vos cours quand vous voulez, en ligne ou en présentiel.</p>
          </div>
          <div class="feature-card">
            <mat-icon class="feature-icon">star</mat-icon>
            <h3>Avis et notes</h3>
            <p>Consultez les avis des autres élèves pour choisir le meilleur professeur.</p>
          </div>
          <div class="feature-card">
            <mat-icon class="feature-icon">security</mat-icon>
            <h3>Paiement sécurisé</h3>
            <p>Paiement sécurisé et satisfaction garantie pour tous vos cours.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="subjects-section">
      <div class="container">
        <h2>Matières populaires</h2>
        <div class="subjects-grid">
          <div class="subject-card" *ngFor="let subject of popularSubjects">
            <mat-icon class="subject-icon">{{ subject.icon }}</mat-icon>
            <h3>{{ subject.name }}</h3>
            <p>{{ subject.description }}</p>
            <button mat-button color="primary" routerLink="/courses" [queryParams]="{subject: subject.name}">
              Voir les cours
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-courses-section">
      <div class="container">
        <h2>Cours récents</h2>
        <div class="courses-grid">
          <mat-card class="course-card" *ngFor="let course of recentCourses">
            <mat-card-header>
              <mat-card-title>{{ course.title }}</mat-card-title>
              <mat-card-subtitle>{{ course.subject }} - {{ course.level }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>{{ course.description | slice:0:100 }}...</p>
              <div class="course-info">
                <span class="price">{{ course.pricePerHour }}€/h</span>
                <span class="teacher">{{ course.teacher.firstName }} {{ course.teacher.lastName }}</span>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary" [routerLink]="['/courses', course.id]">
                Voir détails
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <div class="container">
        <h2>Prêt à commencer ?</h2>
        <p>Rejoignez des milliers d'élèves qui ont déjà trouvé leur professeur idéal</p>
        <button mat-raised-button color="primary" routerLink="/register" class="cta-button">
          Commencer maintenant
        </button>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 0;
      text-align: center;
    }
    
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }
    
    .hero-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .hero-btn {
      padding: 12px 30px;
      font-size: 1.1rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .features-section {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .features-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 60px;
      color: #333;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
    }
    
    .feature-card {
      text-align: center;
      padding: 30px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      font-size: 3rem;
      color: #1976d2;
      margin-bottom: 20px;
    }
    
    .feature-card h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #333;
    }
    
    .feature-card p {
      color: #666;
      line-height: 1.6;
    }
    
    .subjects-section {
      padding: 80px 0;
    }
    
    .subjects-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 60px;
      color: #333;
    }
    
    .subjects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }
    
    .subject-card {
      text-align: center;
      padding: 40px 30px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;
    }
    
    .subject-card:hover {
      transform: translateY(-5px);
    }
    
    .subject-icon {
      font-size: 3rem;
      color: #1976d2;
      margin-bottom: 20px;
    }
    
    .subject-card h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #333;
    }
    
    .subject-card p {
      color: #666;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .recent-courses-section {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .recent-courses-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 60px;
      color: #333;
    }
    
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .course-card {
      transition: transform 0.3s;
    }
    
    .course-card:hover {
      transform: translateY(-5px);
    }
    
    .course-info {
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
    
    .teacher {
      color: #666;
      font-style: italic;
    }
    
    .cta-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }
    
    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    
    .cta-section p {
      font-size: 1.2rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }
    
    .cta-button {
      padding: 15px 40px;
      font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .hero-content p {
        font-size: 1rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .features-section h2,
      .subjects-section h2,
      .recent-courses-section h2,
      .cta-section h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  recentCourses: Course[] = [];
  popularSubjects = [
    {
      name: 'Mathématiques',
      icon: 'functions',
      description: 'Algèbre, géométrie, calcul différentiel et intégral'
    },
    {
      name: 'Français',
      icon: 'book',
      description: 'Grammaire, littérature, expression écrite et orale'
    },
    {
      name: 'Anglais',
      icon: 'language',
      description: 'Grammaire, conversation, préparation aux examens'
    },
    {
      name: 'Physique',
      icon: 'science',
      description: 'Mécanique, électricité, optique, thermodynamique'
    },
    {
      name: 'Chimie',
      icon: 'science',
      description: 'Chimie organique, inorganique, équilibres'
    },
    {
      name: 'Histoire',
      icon: 'history',
      description: 'Histoire ancienne, moderne, contemporaine'
    }
  ];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadRecentCourses();
  }

  loadRecentCourses(): void {
    this.courseService.getAllCourses().subscribe((courses: Course[]) => {
      this.recentCourses = courses.slice(0, 6); // Afficher les 6 premiers cours
    });
  }
}
