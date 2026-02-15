# Guide d'installation et d'utilisation

Ce guide vous permettra d'installer et de lancer le projet en local.

## Prérequis

| Outil | Version minimale | Installation |
|-------|------------------|---------------|
| Java | 17+ | [Download](https://adoptium.net/) |
| Node.js | 18+ | [Download](https://nodejs.org/) |
| Maven | 3.6+ | [Download](https://maven.apache.org/) |
| Git | Any | [Download](https://git-scm.com/) |

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Brainfeed-1996/Site_Cours_Particuliers_Java_Angular.git
cd Site_Cours_Particuliers_Java_Angular
```

### 2. Backend (Spring Boot)

#### Installation des dépendances et compilation

```bash
cd backend
mvn clean compile
```

#### Lancement du backend

```bash
mvn spring-boot:run
```

Le backend démarre sur `http://localhost:8080`

#### Console H2 (optionnel)

Accessible sur `http://localhost:8080/h2-console`

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (laisser vide)

### 3. Frontend (Angular)

#### Installation des dépendances

```bash
cd frontend
npm install
```

#### Lancement du frontend

```bash
npm start
```

Le frontend démarre sur `http://localhost:4200`

## Utilisation rapide

### Script de démarrage (Windows)

```bash
start.bat
```

### Script de démarrage (Linux/Mac)

```bash
chmod +x start.sh
./start.sh
```

## Comptes de test

### Compte professeur

| Champ | Valeur |
|-------|--------|
| Email | teacher@example.com |
| Mot de passe | password |
| Rôle | TEACHER |

### Compte étudiant

| Champ | Valeur |
|-------|--------|
| Email | student@example.com |
| Mot de passe | password |
| Rôle | STUDENT |

## Configuration

### Variables d'environnement Backend

Créez un fichier `application.properties` dans `backend/src/main/resources/`:

```properties
# Base de données
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

### Configuration Frontend

Les configurations se trouvent dans :
- `frontend/angular.json` - Configuration Angular
- `frontend/package.json` - Dépendances npm

## Dépannage

### Problèmes courants

#### "Port 8080 déjà utilisé"
```bash
# Trouver le processus utilisant le port
netstat -ano | findstr :8080
# Terminer le processus
taskkill /PID <PID> /F
```

#### "Port 4200 déjà utilisé"
```bash
# Trouver et tuer le processus
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

#### Erreur Node.js
```bash
# Supprimer node_modules et réinstaller
rm -rf frontend/node_modules
cd frontend
npm install
```

#### Erreur Maven
```bash
# Nettoyer le cache
mvn clean
mvn compile
```

## Build pour production

### Backend

```bash
cd backend
mvn clean package
java -jar target/*.jar
```

### Frontend

```bash
cd frontend
ng build --configuration=production
```

Les fichiers de build se trouvent dans `frontend/dist/`

## Docker (optionnel)

### Construction des images

```bash
# Backend
docker build -t cours-particuliers-backend -f backend/Dockerfile .

# Frontend
docker build -t cours-particuliers-frontend -f frontend/Dockerfile .
```

### Lancement avec Docker Compose

```bash
docker-compose up -d
```
