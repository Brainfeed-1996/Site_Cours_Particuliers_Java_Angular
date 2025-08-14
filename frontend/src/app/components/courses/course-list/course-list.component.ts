import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  template: `
    <div class="container">
      <h1 class="page-title">Cours disponibles</h1>
      
      <!-- Filtres -->
      <div class="filters-section">
        <div class="filters-row">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Rechercher un cours</mat-label>
            <input matInput [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="Mathématiques, français...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Matière</mat-label>
            <mat-select [(ngModel)]="selectedSubject" (selectionChange)="onFilterChange()">
              <mat-option value="">Toutes les matières</mat-option>
              <mat-option *ngFor="let subject of subjects" [value]="subject">
                {{ subject }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Niveau</mat-label>
            <mat-select [(ngModel)]="selectedLevel" (selectionChange)="onFilterChange()">
              <mat-option value="">Tous les niveaux</mat-option>
              <mat-option *ngFor="let level of levels" [value]="level">
                {{ level }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
      
      <!-- Résultats -->
      <div class="results-section">
        <div class="results-header">
          <p>{{ filteredCourses.length }} cours trouvé(s)</p>
        </div>
        
        <div class="loading-spinner" *ngIf="isLoading">
          <mat-spinner></mat-spinner>
        </div>
        
        <div class="courses-grid" *ngIf="!isLoading && filteredCourses.length > 0">
          <mat-card class="course-card" *ngFor="let course of filteredCourses">
            <mat-card-header>
              <mat-card-title>{{ course.title }}</mat-card-title>
              <mat-card-subtitle>
                {{ course.subject }} - {{ course.level }}
              </mat-card-subtitle>
            </mat-card-header>
            
            <mat-card-content>
              <p class="course-description">
                {{ course.description | slice:0:150 }}{{ course.description.length > 150 ? '...' : '' }}
              </p>
              
              <div class="course-details">
                <div class="price-info">
                  <span class="price">{{ course.pricePerHour }}€</span>
                  <span class="per-hour">/heure</span>
                </div>
                
                <div class="teacher-info">
                  <mat-icon>person</mat-icon>
                  <span>{{ course.teacher.firstName }} {{ course.teacher.lastName }}</span>
                </div>
                
                <div class="course-options">
                  <mat-chip-set>
                    <mat-chip *ngIf="course.online" color="primary" selected>
                      <mat-icon>computer</mat-icon>
                      En ligne
                    </mat-chip>
                    <mat-chip *ngIf="course.inPerson" color="accent" selected>
                      <mat-icon>location_on</mat-icon>
                      Présentiel
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </div>
            </mat-card-content>
            
            <mat-card-actions>
              <button mat-raised-button color="primary" [routerLink]="['/courses', course.id]">
                Voir détails
              </button>
              <button mat-stroked-button [routerLink]="['/teachers', course.teacher.id]">
                Voir le professeur
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
        
        <div class="no-results" *ngIf="!isLoading && filteredCourses.length === 0">
          <mat-icon class="no-results-icon">search_off</mat-icon>
          <h3>Aucun cours trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filters-section { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-bottom: 30px; }
    .filters-row { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
    .search-field { flex: 2; min-width: 250px; }
    .filter-field { flex: 1; min-width: 150px; }
    .results-section { margin-top: 20px; }
    .results-header { margin-bottom: 20px; color: #666; }
    .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
    .course-card { transition: transform 0.3s, box-shadow 0.3s; }
    .course-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); }
    .course-description { color: #666; line-height: 1.6; margin: 15px 0; }
    .course-details { margin-top: 20px; }
    .price-info { display: flex; align-items: baseline; margin-bottom: 10px; }
    .price { font-size: 1.5rem; font-weight: bold; color: #1976d2; }
    .per-hour { color: #666; margin-left: 5px; }
    .teacher-info { display: flex; align-items: center; gap: 8px; color: #666; margin-bottom: 15px; }
    .teacher-info mat-icon { font-size: 1rem; }
    .course-options { margin-bottom: 15px; }
    .course-options mat-chip { margin-right: 8px; }
    .course-options mat-icon { font-size: 1rem; margin-right: 4px; }
    mat-card-actions { display: flex; gap: 10px; padding: 16px; }
    .no-results { text-align: center; padding: 60px 20px; color: #666; }
    .no-results-icon { font-size: 4rem; color: #ccc; margin-bottom: 20px; }
    .no-results h3 { margin-bottom: 10px; color: #333; }
    @media (max-width: 768px) { .filters-row { flex-direction: column; align-items: stretch; } .search-field, .filter-field { flex: none; min-width: auto; } .courses-grid { grid-template-columns: 1fr; } mat-card-actions { flex-direction: column; } }
  `]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  subjects: string[] = [];
  levels: string[] = [];
  searchQuery = '';
  selectedSubject = '';
  selectedLevel = '';
  isLoading = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadSubjects();
    this.loadLevels();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
        this.filteredCourses = courses;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Erreur lors du chargement des cours:', error);
        this.isLoading = false;
      }
    });
  }

  loadSubjects(): void {
    this.courseService.getAllSubjects().subscribe((subjects: string[]) => {
      this.subjects = subjects;
    });
  }

  loadLevels(): void {
    this.courseService.getAllLevels().subscribe((levels: string[]) => {
      this.levels = levels;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter((course: Course) => {
      const matchesSearch = !this.searchQuery || 
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesSubject = !this.selectedSubject || course.subject === this.selectedSubject;
      const matchesLevel = !this.selectedLevel || course.level === this.selectedLevel;
      
      return matchesSearch && matchesSubject && matchesLevel;
    });
  }
}
