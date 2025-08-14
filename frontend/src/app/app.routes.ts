import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
import { TeacherListComponent } from './components/teachers/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './components/teachers/teacher-detail/teacher-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'teachers', component: TeacherListComponent },
  { path: 'teachers/:id', component: TeacherDetailComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
