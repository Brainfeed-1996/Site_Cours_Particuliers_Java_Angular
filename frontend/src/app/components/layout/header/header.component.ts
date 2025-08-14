import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
  template: `
    <mat-toolbar color="primary" class="header">
      <div class="header-content">
        <div class="logo">
          <a routerLink="/" class="logo-link">
            <mat-icon>school</mat-icon>
            <span>Cours Particuliers</span>
          </a>
        </div>
        
        <nav class="nav-links">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Accueil
          </a>
          <a mat-button routerLink="/courses" routerLinkActive="active">
            Cours
          </a>
          <a mat-button routerLink="/teachers" routerLinkActive="active">
            Professeurs
          </a>
        </nav>
        
        <div class="auth-buttons" *ngIf="!isLoggedIn()">
          <a mat-button routerLink="/login">
            Connexion
          </a>
          <a mat-raised-button color="accent" routerLink="/register">
            Inscription
          </a>
        </div>
        
        <div class="user-menu" *ngIf="isLoggedIn()">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item routerLink="/profile">
              <mat-icon>person</mat-icon>
              <span>Profil</span>
            </button>
            <button mat-menu-item routerLink="/dashboard">
              <mat-icon>dashboard</mat-icon>
              <span>Tableau de bord</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Déconnexion</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header { position: sticky; top: 0; z-index: 1000; }
    .header-content { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .logo { display: flex; align-items: center; }
    .logo-link { display: flex; align-items: center; text-decoration: none; color: white; font-size: 1.2rem; font-weight: 500; }
    .logo-link mat-icon { margin-right: 8px; }
    .nav-links { display: flex; gap: 16px; }
    .nav-links a { color: white; text-decoration: none; }
    .nav-links a.active { background-color: rgba(255, 255, 255, 0.1); }
    .auth-buttons { display: flex; gap: 8px; }
    .user-menu { display: flex; align-items: center; }
    @media (max-width: 768px) { .nav-links { display: none; } .header-content { padding: 0 10px; } }
  `]
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  logout(): void {
    this.authService.logout();
  }
}
