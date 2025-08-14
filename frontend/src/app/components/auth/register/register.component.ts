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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
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
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Inscription</mat-card-title>
          <mat-card-subtitle>Créez votre compte</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Prénom</mat-label>
                <input matInput formControlName="firstName" placeholder="Votre prénom">
                <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">
                  Le prénom est requis
                </mat-error>
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Nom</mat-label>
                <input matInput formControlName="lastName" placeholder="Votre nom">
                <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">
                  Le nom est requis
                </mat-error>
              </mat-form-field>
            </div>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="votre@email.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                L'email est requis
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Format d'email invalide
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mot de passe</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Le mot de passe est requis
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Le mot de passe doit contenir au moins 6 caractères
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Rôle</mat-label>
              <mat-select formControlName="role">
                <mat-option value="STUDENT">Élève</mat-option>
                <mat-option value="TEACHER">Professeur</mat-option>
              </mat-select>
              <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                Le rôle est requis
              </mat-error>
            </mat-form-field>
            
            <div class="teacher-fields" *ngIf="isTeacher()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Téléphone</mat-label>
                <input matInput formControlName="phone" placeholder="06 12 34 56 78">
                <mat-icon matSuffix>phone</mat-icon>
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Adresse</mat-label>
                <input matInput formControlName="address" placeholder="Votre adresse">
                <mat-icon matSuffix>location_on</mat-icon>
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Biographie</mat-label>
                <textarea matInput formControlName="bio" rows="3" 
                          placeholder="Présentez-vous et vos compétences..."></textarea>
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Tarif horaire (€)</mat-label>
                <input matInput type="number" formControlName="hourlyRate" placeholder="30">
                <mat-icon matSuffix>euro</mat-icon>
                <mat-error *ngIf="registerForm.get('hourlyRate')?.hasError('min')">
                  Le tarif doit être positif
                </mat-error>
              </mat-form-field>
            </div>
            
            <button mat-raised-button color="primary" type="submit" class="full-width register-btn" 
                    [disabled]="registerForm.invalid || isLoading">
              <mat-icon *ngIf="isLoading">hourglass_empty</mat-icon>
              {{ isLoading ? 'Inscription...' : 'S\'inscrire' }}
            </button>
          </form>
        </mat-card-content>
        
        <mat-divider></mat-divider>
        
        <mat-card-actions>
          <p class="login-link">
            Déjà un compte ? 
            <a routerLink="/login">Se connecter</a>
          </p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 200px); padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .register-card { max-width: 500px; width: 100%; padding: 20px; }
    .register-card mat-card-header { text-align: center; margin-bottom: 20px; }
    .register-card mat-card-title { font-size: 1.8rem; color: #333; margin-bottom: 10px; }
    .register-card mat-card-subtitle { color: #666; font-size: 1rem; }
    .form-row { display: flex; gap: 20px; margin-bottom: 20px; }
    .half-width { flex: 1; }
    .full-width { width: 100%; margin-bottom: 20px; }
    .teacher-fields { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
    .register-btn { margin-top: 10px; padding: 12px; font-size: 1.1rem; }
    .login-link { text-align: center; margin: 20px 0 0 0; color: #666; }
    .login-link a { color: #1976d2; text-decoration: none; font-weight: 500; }
    .login-link a:hover { text-decoration: underline; }
    mat-card-actions { padding: 16px; text-align: center; }
    @media (max-width: 600px) { .register-container { padding: 10px; } .register-card { padding: 15px; } .form-row { flex-direction: column; gap: 0; } }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['STUDENT', [Validators.required]],
      phone: [''],
      address: [''],
      bio: [''],
      hourlyRate: [null, [Validators.min(0)]]
    });
  }

  isTeacher(): boolean {
    return this.registerForm.get('role')?.value === 'TEACHER';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const userData = this.registerForm.value;
      
      this.authService.register(userData).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Inscription réussie !', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Erreur lors de l\'inscription. Veuillez réessayer.', 'Fermer', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}
