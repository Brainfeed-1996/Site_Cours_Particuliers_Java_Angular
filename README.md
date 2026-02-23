# CoursParticuliers - Plateforme E-commerce de Cours Particuliers

Une plateforme complète de cours particuliers développée avec **Java Spring Boot** (backend) et **Angular 17** (frontend), permettant aux professeurs de proposer leurs services et aux élèves de réserver des cours dans tous les domaines.

## 🚀 Fonctionnalités

### 👥 Gestion des utilisateurs
- **Inscription/Connexion** avec authentification JWT
- **Rôles utilisateurs** : Élève, Professeur, Administrateur
- **Profils personnalisés** avec bio, tarifs, et informations de contact
- **Gestion des sessions** sécurisée

### 📚 Gestion des cours
- **Création de cours** par les professeurs
- **Recherche avancée** avec filtres (matière, niveau, prix, localisation)
- **Détails complets** : description, prérequis, matériel nécessaire
- **Cours en ligne et en présentiel**
- **Système de notation et avis**

### 🎯 Réservations et paiements
- **Système de réservation** de cours
- **Gestion des créneaux** horaires
- **Suivi des réservations** (en attente, confirmée, annulée, terminée)
- **Calcul automatique** des prix

### 💬 Système d'avis
- **Notation des professors** (1-5 étoiles)
- **Commentaires détaillés** des élèves
- **Moyennes et statistiques** par professeur

## 🛠️ Architecture Technique

### Backend (Java Spring Boot)
- **Framework** : Spring Boot 3.x
- **Base de données** : H2 (développement) / PostgreSQL (production)
- **Sécurité** : Spring Security + JWT
- **ORM** : Spring Data JPA
- **Validation** : Bean Validation
- **Build** : Maven

### Frontend (Angular 17)
- **Framework** : Angular 17 (standalone components)
- **UI Components** : Angular Material
- **Routing** : Angular Router avec guards
- **HTTP Client** : Intercepteurs pour JWT
- **Build** : Angular CLI

### Base de données
- **Entités** : User, Course, Booking, Review
- **Relations** : Many-to-One, One-to-Many
- **Indexation** : Optimisée pour les recherches

## 📦 Installation

### Prérequis
- **Java 17** ou supérieur
- **Node.js 18** ou supérieur
- **Maven 3.6** ou supérieur
- **Git**

### Installation rapide

#### Windows
```bash
# Cloner le projet
git clone <repository-url>
cd Site-Java

# Démarrer l'application
start.bat
```

#### Linux/Mac
```bash
# Cloner le projet
git clone <repository-url>
cd Site-Java

# Rendre le script exécutable
chmod +x start.sh

# Démarrer l'application
./start.sh
```

### Installation manuelle

#### 1. Backend
```bash
cd backend

# Compiler le projet
mvn clean compile

# Démarrer l'application
mvn spring-boot:run
```

#### 2. Frontend
```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer l'application
npm start
```

## 🌐 Accès à l'application

- **Frontend (Production)** : [https://frontend-olivier-robert-duboilles-projects.vercel.app](https://frontend-olivier-robert-duboilles-projects.vercel.app)
- **Frontend (Local)** : http://localhost:4200
- **Backend API** : http://localhost:8080
- **H2 Console** : http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (laisser vide)

## 👤 Utilisateurs de test

### Professeur
- **Email** : `teacher@example.com`
- **Mot de passe** : `password`
- **Rôle** : TEACHER

### Élève
- **Email** : `student@example.com`
- **Mot de passe** : `password`
- **Rôle** : STUDENT

## 📋 Fonctionnalités détaillées

### Page d'accueil
- **Section héro** avec call-to-action
- **Fonctionnalités** principales
- **Matières populaires** avec navigation
- **Cours récents** avec aperçu

### Recherche de cours
- **Barre de recherche** textuelle
- **Filtres avancés** :
  - Matière
  - Niveau (Débutant, Intermédiaire, Avancé)
  - Prix maximum
  - Localisation
- **Tri** par prix, note, date
- **Pagination** avec "Charger plus"

### Détail d'un cours
- **Informations complètes** du cours
- **Profil du professeur** avec statistiques
- **Avis et notes** des élèves
- **Bouton de réservation** directe
- **Informations de contact**

### Authentification
- **Formulaire de connexion** avec validation
- **Inscription** avec sélection du rôle
- **Champs conditionnels** pour les professeurs
- **Validation en temps réel**
- **Gestion des erreurs**

### Interface responsive
- **Design adaptatif** pour mobile, tablette, desktop
- **Navigation intuitive** avec header fixe
- **Animations fluides** et transitions
- **Thème cohérent** Material Design

## 🔧 Configuration

### Variables d'environnement

#### Backend (`application.properties`)
```properties
# Base de données
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

## 🚀 Déploiement

### Production
1. **Backend** : Build avec `mvn clean package`
2. **Frontend** : Build avec `ng build --prod`
3. **Base de données** : Configurer PostgreSQL
4. **Serveur** : Déployer sur serveur web (Tomcat, etc.)

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

## 📊 Structure du projet

```
Site-Java/
├── backend/                          # Application Spring Boot
│   ├── src/main/java/com/cours/
│   │   ├── controller/               # Contrôleurs REST
│   │   ├── service/                  # Services métier
│   │   ├── repository/               # Repositories JPA
│   │   ├── entity/                   # Entités JPA
│   │   ├── dto/                      # Objets de transfert
│   │   ├── config/                   # Configuration
│   │   └── CoursParticuliersApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                         # Application Angular
│   ├── src/app/
│   │   ├── components/               # Composants Angular
│   │   ├── services/                 # Services Angular
│   │   ├── guards/                   # Guards de route
│   │   ├── interceptors/             # Intercepteurs HTTP
│   │   └── app.component.ts
│   ├── src/styles.scss
│   ├── angular.json
│   └── package.json
├── start.bat                         # Script de démarrage Windows
├── start.sh                          # Script de démarrage Linux/Mac
└── README.md
```

## 🐛 Dépannage

### Problèmes courants

#### Backend ne démarre pas
- Vérifier Java 17+ installé
- Vérifier Maven installé
- Vérifier le port 8080 libre

#### Frontend ne démarre pas
- Vérifier Node.js 18+ installé
- Exécuter `npm install` dans le dossier frontend
- Vérifier le port 4200 libre

#### Erreurs de compilation
- Nettoyer et recompiler : `mvn clean compile`
- Supprimer node_modules et réinstaller : `rm -rf node_modules && npm install`

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Architecture technique détaillée
- **[FEATURES.md](docs/FEATURES.md)** - Liste complète des fonctionnalités
- **[USAGE.md](docs/USAGE.md)** - Guide d'installation et d'utilisation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guide de contribution

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**CoursParticuliers** - Fait avec ❤️ pour l'éducation
