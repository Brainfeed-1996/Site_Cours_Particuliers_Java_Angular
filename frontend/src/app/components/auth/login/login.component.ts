import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Connexion</mat-card-title>
          <mat-card-subtitle>Connectez-vous à votre compte</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="votre@email.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                L'email est requis
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Format d'email invalide
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mot de passe</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Le mot de passe est requis
              </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                Le mot de passe doit contenir au moins 6 caractères
              </mat-error>
            </mat-form-field>
            
            <button mat-raised-button color="primary" type="submit" class="full-width login-btn" 
                    [disabled]="loginForm.invalid || isLoading">
              <mat-icon *ngIf="isLoading">hourglass_empty</mat-icon>
              {{ isLoading ? 'Connexion...' : 'Se connecter' }}
            </button>
          </form>
        </mat-card-content>
        
        <mat-divider></mat-divider>
        
        <mat-card-actions>
          <p class="register-link">
            Pas encore de compte ? 
            <a routerLink="/register">Créer un compte</a>
          </p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .login-card {
      max-width: 400px;
      width: 100%;
      padding: 20px;
    }
    
    .login-card mat-card-header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .login-card mat-card-title {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 10px;
    }
    
    .login-card mat-card-subtitle {
      color: #666;
      font-size: 1rem;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }
    
    .login-btn {
      margin-top: 10px;
      padding: 12px;
      font-size: 1.1rem;
    }
    
    .register-link {
      text-align: center;
      margin: 20px 0 0 0;
      color: #666;
    }
    
    .register-link a {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
    }
    
    .register-link a:hover {
      text-decoration: underline;
    }
    
    mat-card-actions {
      padding: 16px;
      text-align: center;
    }
    
    @media (max-width: 480px) {
      .login-container {
        padding: 10px;
      }
      
      .login-card {
        padding: 15px;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;
      
      this.authService.login(credentials).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Connexion réussie !', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Erreur de connexion. Vérifiez vos identifiants.', 'Fermer', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}
