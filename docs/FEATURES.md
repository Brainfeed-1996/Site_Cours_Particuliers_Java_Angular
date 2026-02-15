# Fonctionnalités

Ce document liste toutes les fonctionnalités de la plateforme CoursParticuliers.

## Gestion des utilisateurs

### Inscription
- Formulaire d'inscription avec validation
- Sélection du rôle (Étudiant / Professeur)
- Champs spécifiques pour les professeurs (bio, tarif horaire)
- Hachage du mot de passe avec BCrypt

### Connexion
- Authentification par email et mot de passe
- Génération d'un token JWT
- Stockage sécurisé du token dans LocalStorage

### Profils utilisateur
- **Étudiant** : Visualisation des cours, réservations, historique
- **Professeur** : Gestion des cours, profil public, statistiques
- **Administrateur** : Gestion complète (non implémenté)

## Gestion des cours

### Création de cours (Professeur)
- Titre et description
- Matière (Mathématiques, Physique, Chimie, etc.)
- Niveau (Débutant, Intermédiaire, Avancé)
- Prix horaire
- Localisation (en présentiel) ou cours en ligne
- Prérequis et matériel nécessaire

### Recherche de cours
- Barre de recherche textuelle
- Filtres disponibles :
  - Matière
  - Niveau
  - Prix maximum
  - Localisation
  - Cours en ligne uniquement
- Tri par :
  - Prix (croissant/décroissant)
  - Note (meilleurs notés)
  - Date (plus récents)

### Détails d'un cours
- Informations complètes
- Profil du professeur avec statistiques
- Moyenne des notes
- Nombre de réservations
- Bouton de réservation directe
- Coordonnées du professeur

## Système de réservation

### Processus de réservation
1. L'étudiant sélectionne un cours
2. Clique sur "Réserver"
3. Sélectionne une date et un créneau
4. Confirme la réservation
5. Le professeur reçoit une notification

### États des réservations
- **PENDING** : En attente de confirmation
- **CONFIRMED** : Confirmée par le professeur
- **CANCELLED** : Annulée
- **COMPLETED** : Terminée

### Gestion des créneaux
- Planification des séances
- Disponibilité du professeur
- Calendrier interactif

## Système d'avis et notation

### Notation
- Échelle de 1 à 5 étoiles
- Commentaire optionnel
- Moyenne calculée automatiquement

### Affichage
- Notes visibles sur les profils professeur
- Détails des cours
- Statistiques (nombre d'avis, note moyenne)

## Interface utilisateur

### Design responsive
- Compatible mobile, tablette et desktop
- Navigation adaptative
- Composants Angular Material

### Expérience utilisateur
- Animations fluides
- Chargement progressif
- Messages d'erreur clairs
- Validation en temps réel

### Accessibilité
- Conformité WCAG de base
- Navigation au clavier
- Contraste suffisant

## API REST

### Endpoints d'authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil actuel

### Endpoints des cours
- `GET /api/courses` - Liste des cours
- `GET /api/courses/{id}` - Détail d'un cours
- `POST /api/courses` - Créer un cours (professeur)
- `PUT /api/courses/{id}` - Modifier un cours
- `DELETE /api/courses/{id}` - Supprimer un cours

### Endpoints des réservation
- `POST /api/bookings` - Créer une réservation
- `GET /api/bookings` - Liste des réservations
- `PUT /api/bookings/{id}` - Modifier le statut

### Endpoints des avis
- `POST /api/reviews` - Ajouter un avis
- `GET /api/courses/{id}/reviews` - Avis d'un cours

## Fonctionnalités futures

- [ ] Système de paiement en ligne
- [ ] Messagerie entre étudiants et professeurs
- [ ] Tableau de bord administrateur
- [ ] Application mobile
- [ ] Système de recommandations
- [ ] Vidéoconférence intégrée
