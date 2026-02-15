# Architecture Technique

Ce document décrit l'architecture technique de la plateforme CoursParticuliers.

## Vue d'ensemble

Le projet est une application full-stack utilisant :
- **Backend** : Java Spring Boot 3.x
- **Frontend** : Angular 17
- **Base de données** : H2 (dev) / PostgreSQL (prod)

## Architecture Backend (Spring Boot)

### Structure des packages

```
com.cours/
├── config/           # Configuration Spring
│   ├── SecurityConfig.java
│   └── DataInitializer.java
├── controller/      # Contrôleurs REST
│   ├── AuthController.java
│   ├── CourseController.java
│   └── TeacherController.java
├── dto/             # Data Transfer Objects
│   ├── AuthRequest.java
│   ├── AuthResponse.java
│   └── RegisterRequest.java
├── entity/          # Entités JPA
│   ├── User.java
│   ├── Course.java
│   ├── Booking.java
│   └── Review.java
├── repository/      # Interfaces JPA
│   ├── UserRepository.java
│   ├── CourseRepository.java
│   ├── BookingRepository.java
│   └── ReviewRepository.java
├── service/         # Logique métier
│   ├── AuthService.java
│   ├── JwtService.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
└── CoursParticuliersApplication.java
```

### Entités et Relations

#### User
- `id`: Long (PK)
- `email`: String (unique)
- `password`: String (hachée)
- `firstName`: String
- `lastName`: String
- `role`: Enum (STUDENT, TEACHER, ADMIN)
- `bio`: String (optionnel)
- `hourlyRate`: BigDecimal (optionnel)
- `courses`: List<Course> (OneToMany)
- `bookings`: List<Booking> (OneToMany)

#### Course
- `id`: Long (PK)
- `title`: String
- `description`: Text
- `subject`: String
- `level`: Enum (BEGINNER, INTERMEDIATE, ADVANCED)
- `price`: BigDecimal
- `location`: String
- `isOnline`: Boolean
- `teacher`: User (ManyToOne)
- `bookings`: List<Booking> (OneToMany)

#### Booking
- `id`: Long (PK)
- `student`: User (ManyToOne)
- `course`: Course (ManyToOne)
- `status`: Enum (PENDING, CONFIRMED, CANCELLED, COMPLETED)
- `bookingDate`: LocalDateTime
- `scheduledDate`: LocalDateTime

#### Review
- `id`: Long (PK)
- `rating`: Integer (1-5)
- `comment`: Text
- `student`: User (ManyToOne)
- `course`: Course (ManyToOne)
- `createdAt`: LocalDateTime

### Sécurité

#### Authentification JWT
- **Algorithme** : HMAC SHA-256
- **Expiration** : 24 heures (86400000 ms)
- **Stockage** : LocalStorage côté client
- **Header** : `Authorization: Bearer <token>`

#### Configuration CORS
- Origines autorisées : `http://localhost:4200` (dev)

## Architecture Frontend (Angular 17)

### Structure des composants

```
src/app/
├── components/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── courses/
│   │   ├── course-list/
│   │   └── course-detail/
│   ├── dashboard/
│   ├── home/
│   ├── layout/
│   │   ├── header/
│   │   └── footer/
│   ├── profile/
│   └── teachers/
│       ├── teacher-list/
│       └── teacher-detail/
├── services/
│   ├── auth.service.ts
│   └── course.service.ts
├── guards/
│   └── auth.guard.ts
├── interceptors/
│   └── auth.interceptor.ts
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

### Flux de données

1. **Authentification**
   - L'utilisateur soumet le formulaire de login/register
   - Le service AuthService envoie une requête POST à `/api/auth/login`
   - Le backend retourne un JWT
   - Le token est stocké dans LocalStorage
   - L'intercepteur AuthInterceptor ajoute le token à chaque requête

2. **Consultation des cours**
   - L'utilisateur accède à la liste des cours
   - CourseService appelle `/api/courses`
   - Les données sont affichées via course-list.component

3. **Réservation**
   - L'utilisateur clique sur "Réserver"
   - Vérification de l'authentification via AuthGuard
   - Requête POST vers `/api/bookings`
   - Mise à jour du statut

### Guards et Intercepteurs

#### AuthGuard
- Protège les routes nécessitant une authentification
- Vérifie la présence d'un token valide

#### AuthInterceptor
- Intercepte chaque requête HTTP
- Ajoute le header `Authorization: Bearer <token>`
- Gère les erreurs 401 (redirect vers login)

## Base de données

### Schéma H2 (développement)

```sql
-- Users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20),
    bio TEXT,
    hourly_rate DECIMAL(10,2)
);

-- Courses
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject VARCHAR(100),
    level VARCHAR(20),
    price DECIMAL(10,2) NOT NULL,
    location VARCHAR(255),
    is_online BOOLEAN,
    teacher_id BIGINT REFERENCES users(id)
);

-- Bookings
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT REFERENCES users(id),
    course_id BIGINT REFERENCES courses(id),
    status VARCHAR(20),
    booking_date TIMESTAMP,
    scheduled_date TIMESTAMP
);

-- Reviews
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL,
    comment TEXT,
    student_id BIGINT REFERENCES users(id),
    course_id BIGINT REFERENCES courses(id),
    created_at TIMESTAMP
);
```

## Configuration

### Backend (application.properties)

```properties
# Base de données H2
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=votre-secret-jwt-super-securise
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:4200

# H2 Console
spring.h2.console.enabled=true
```

### Frontend (environment)

Les configurations sont gérées via `angular.json` et les variables d'environnement.

## Déploiement

### Docker

#### Backend
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### Frontend
```dockerfile
FROM nginx:alpine
COPY frontend/dist/* /usr/share/nginx/html/
EXPOSE 80
```

### Production

1. **Backend**
   - Compiler : `mvn clean package -Dprod`
   - Déployer le JAR sur un serveur Tomcat

2. **Frontend**
   - Build : `ng build --configuration=production`
   - Servir via Nginx ou tout serveur web

3. **Base de données**
   - Migrer vers PostgreSQL
   - Mettre à jour les credentials dans application.properties
