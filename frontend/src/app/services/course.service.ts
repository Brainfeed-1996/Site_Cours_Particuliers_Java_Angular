import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  description: string;
  subject: string;
  level: string;
  pricePerHour: number;
  teacher: Teacher;
  location?: string;
  online: boolean;
  inPerson: boolean;
  requirements?: string;
  materials?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  hourlyRate?: number;
  phone?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getCoursesByTeacher(teacherId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  getCoursesBySubject(subject: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/subject/${subject}`);
  }

  searchCourses(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/search?query=${query}`);
  }

  getAllSubjects(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/subjects`);
  }

  getAllLevels(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/levels`);
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
