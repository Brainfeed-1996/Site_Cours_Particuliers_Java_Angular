# CoursParticuliers - Plateforme E-commerce de Cours Particuliers

Une plateforme complÃ¨te de cours particuliers dÃ©veloppÃ©e avec **Java Spring Boot** (backend) et **Angular 17** (frontend), permettant aux professeurs de proposer leurs services et aux Ã©lÃ¨ves de rÃ©server des cours dans tous les domaines.

## ðŸš€ FonctionnalitÃ©s

### ðŸ‘¥ Gestion des utilisateurs
- **Inscription/Connexion** avec authentification JWT
- **RÃ´les utilisateurs** : Ã‰lÃ¨ve, Professeur, Administrateur
- **Profils personnalisÃ©s** avec bio, tarifs, et informations de contact
- **Gestion des sessions** sÃ©curisÃ©e

### ðŸ“š Gestion des cours
- **CrÃ©ation de cours** par les professeurs
- **Recherche avancÃ©e** avec filtres (matiÃ¨re, niveau, prix, localisation)
- **DÃ©tails complets** : description, prÃ©requis, matÃ©riel nÃ©cessaire
- **Cours en ligne et en prÃ©sentiel**
- **SystÃ¨me de notation et avis**

### ðŸŽ¯ RÃ©servations et paiements
- **SystÃ¨me de rÃ©servation** de cours
- **Gestion des crÃ©neaux** horaires
- **Suivi des rÃ©servations** (en attente, confirmÃ©e, annulÃ©e, terminÃ©e)
- **Calcul automatique** des prix

### ðŸ’¬ SystÃ¨me d'avis
- **Notation des professeurs** (1-5 Ã©toiles)
- **Commentaires dÃ©taillÃ©s** des Ã©lÃ¨ves
- **Moyennes et statistiques** par professeur

## ðŸ› ï¸ Architecture Technique

### Backend (Java Spring Boot)
- **Framework** : Spring Boot 3.x
- **Base de donnÃ©es** : H2 (dÃ©veloppement) / PostgreSQL (production)
- **SÃ©curitÃ©** : Spring Security + JWT
- **ORM** : Spring Data JPA
- **Validation** : Bean Validation
- **Build** : Maven

### Frontend (Angular 17)
- **Framework** : Angular 17 (standalone components)
- **UI Components** : Angular Material
- **Routing** : Angular Router avec guards
- **HTTP Client** : Intercepteurs pour JWT
- **Build** : Angular CLI

### Base de donnÃ©es
- **EntitÃ©s** : User, Course, Booking, Review
- **Relations** : Many-to-One, One-to-Many
- **Indexation** : OptimisÃ©e pour les recherches

## ðŸ“¦ Installation

### PrÃ©requis
- **Java 17** ou supÃ©rieur
- **Node.js 18** ou supÃ©rieur
- **Maven 3.6** ou supÃ©rieur
- **Git**

### Installation rapide

#### Windows
```bash
# Cloner le projet
git clone <repository-url>
cd Site-Java

# DÃ©marrer l'application
start.bat
```

#### Linux/Mac
```bash
# Cloner le projet
git clone <repository-url>
cd Site-Java

# Rendre le script exÃ©cutable
chmod +x start.sh

# DÃ©marrer l'application
./start.sh
```

### Installation manuelle

#### 1. Backend
```bash
cd backend

# Compiler le projet
mvn clean compile

# DÃ©marrer l'application
mvn spring-boot:run
```

#### 2. Frontend
```bash
cd frontend

# Installer les dÃ©pendances
npm install

# DÃ©marrer l'application
npm start
```

## ðŸŒ AccÃ¨s Ã  l'application

- **Frontend** : http://localhost:4200
- **Backend API** : http://localhost:8080
- **H2 Console** : http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (laisser vide)

## ðŸ‘¤ Utilisateurs de test

### Professeur
- **Email** : `teacher@example.com`
- **Mot de passe** : `password`
- **RÃ´le** : TEACHER

### Ã‰lÃ¨ve
- **Email** : `student@example.com`
- **Mot de passe** : `password`
- **RÃ´le** : STUDENT

## ðŸ“‹ FonctionnalitÃ©s dÃ©taillÃ©es

### Page d'accueil
- **Section hÃ©ro** avec call-to-action
- **FonctionnalitÃ©s** principales
- **MatiÃ¨res populaires** avec navigation
- **Cours rÃ©cents** avec aperÃ§u

### Recherche de cours
- **Barre de recherche** textuelle
- **Filtres avancÃ©s** :
  - MatiÃ¨re
  - Niveau (DÃ©butant, IntermÃ©diaire, AvancÃ©)
  - Prix maximum
  - Localisation
- **Tri** par prix, note, date
- **Pagination** avec "Charger plus"

### DÃ©tail d'un cours
- **Informations complÃ¨tes** du cours
- **Profil du professeur** avec statistiques
- **Avis et notes** des Ã©lÃ¨ves
- **Bouton de rÃ©servation** directe
- **Informations de contact**

### Authentification
- **Formulaire de connexion** avec validation
- **Inscription** avec sÃ©lection du rÃ´le
- **Champs conditionnels** pour les professeurs
- **Validation en temps rÃ©el**
- **Gestion des erreurs**

### Interface responsive
- **Design adaptatif** pour mobile, tablette, desktop
- **Navigation intuitive** avec header fixe
- **Animations fluides** et transitions
- **ThÃ¨me cohÃ©rent** Material Design

## ðŸ”§ Configuration

### Variables d'environnement

#### Backend (`application.properties`)
```properties
# Base de donnÃ©es
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver

# JWT
jwt.secret=votre-secret-jwt-super-securise
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:4200
```

#### Frontend
Les configurations sont dans `angular.json` et `package.json`.

## ðŸš€ DÃ©ploiement

### Production
1. **Backend** : Build avec `mvn clean package`
2. **Frontend** : Build avec `ng build --prod`
3. **Base de donnÃ©es** : Configurer PostgreSQL
4. **Serveur** : DÃ©ployer sur serveur web (Tomcat, etc.)

### Docker (optionnel)
```dockerfile
# Backend
FROM openjdk:17-jdk-slim
COPY backend/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# Frontend
FROM nginx:alpine
COPY frontend/dist/* /usr/share/nginx/html/
```

## ðŸ“Š Structure du projet

```
Site-Java/
â”œâ”€â”€ backend/                          # Application Spring Boot
â”‚   â”œâ”€â”€ src/main/java/com/cours/
â”‚   â”‚   â”œâ”€â”€ controller/               # ContrÃ´leurs REST
â”‚   â”‚   â”œâ”€â”€ service/                  # Services mÃ©tier
â”‚   â”‚   â”œâ”€â”€ repository/               # Repositories JPA
â”‚   â”‚   â”œâ”€â”€ entity/                   # EntitÃ©s JPA
â”‚   â”‚   â”œâ”€â”€ dto/                      # Objets de transfert
â”‚   â”‚   â”œâ”€â”€ config/                   # Configuration
â”‚   â”‚   â””â”€â”€ CoursParticuliersApplication.java
â”‚   â”œâ”€â”€ src/main/resources/
â”‚   â”‚   â””â”€â”€ application.properties
â”‚   â””â”€â”€ pom.xml
â”œâ”€â”€ frontend/                         # Application Angular
â”‚   â”œâ”€â”€ src/app/
â”‚   â”‚   â”œâ”€â”€ components/               # Composants Angular
â”‚   â”‚   â”œâ”€â”€ services/                 # Services Angular
â”‚   â”‚   â”œâ”€â”€ guards/                   # Guards de route
â”‚   â”‚   â”œâ”€â”€ interceptors/             # Intercepteurs HTTP
â”‚   â”‚   â””â”€â”€ app.component.ts
â”‚   â”œâ”€â”€ src/styles.scss
â”‚   â”œâ”€â”€ angular.json
â”‚   â””â”€â”€ package.json
â”œâ”€â”€ start.bat                         # Script de dÃ©marrage Windows
â”œâ”€â”€ start.sh                          # Script de dÃ©marrage Linux/Mac
â””â”€â”€ README.md
```

## ðŸ› DÃ©pannage

### ProblÃ¨mes courants

#### Backend ne dÃ©marre pas
- VÃ©rifier Java 17+ installÃ©
- VÃ©rifier Maven installÃ©
- VÃ©rifier le port 8080 libre

#### Frontend ne dÃ©marre pas
- VÃ©rifier Node.js 18+ installÃ©
- ExÃ©cuter `npm install` dans le dossier frontend
- VÃ©rifier le port 4200 libre

#### Erreurs de compilation
- Nettoyer et recompiler : `mvn clean compile`
- Supprimer node_modules et rÃ©installer : `rm -rf node_modules && npm install`

## ðŸ¤ Contribution

1. Fork le projet
2. CrÃ©er une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## ðŸ“„ Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de dÃ©tails.

## ðŸ“ž Support

Pour toute question ou problÃ¨me :
- Ouvrir une issue sur GitHub
- Contacter l'Ã©quipe de dÃ©veloppement

---

**CoursParticuliers** - Fait avec â¤ï¸ pour l'Ã©ducation 
