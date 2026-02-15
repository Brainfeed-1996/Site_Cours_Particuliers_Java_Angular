# Guide de contribution

Merci de votre intérêt pour contribuer à CoursParticuliers ! Ce guide vous aidera à commencer.

## Code de conduite

- Soyez respectueux et inclusif
- Acceptez les critiques constructives de manière professionnelle
- Concentrez-vous sur ce qui est meilleur pour la communauté

## Comment contribuer

### Signaler un bug

1. Vérifiez si le bug n'a pas déjà été signalé
2. Créez une issue avec :
   - Titre clair
   - Description détaillée
   - Étapes pour reproduire
   - Capture d'écran si applicable

### Proposer une fonctionnalité

1. Ouvrez une issue pour discuter de la fonctionnalité
2. Décrivez le cas d'utilisation
3. Proposez une implémentation

### Pull Requests

#### Processus

1. **Fork** le dépôt
2. Créez une branche feature : `git checkout -b feature/ma-fonctionnalite`
3. Committez vos changements : `git commit -m 'Ajout de ma fonctionnalité'`
4. Poussez vers la branche : `git push origin feature/ma-fonctionnalite`
5. Ouvrez une Pull Request

#### Conventions

- **Commits** : Messages clairs et descriptifs
- **Branches** : Nommage cohérent (`feature/`, `fix/`, `hotfix/`)
- **Code** : Respectez les standards existants
- **Tests** : Ajoutez des tests quand applicable

## Standards de code

### Java (Backend)

- Suivez les conventions Java
- Utilisez Lombok pour réduire le boilerplate
- Documentez les méthodes publiques
- Utilisez les exceptions appropriées

### TypeScript/Angular (Frontend)

- Suivez les conventions Angular
- Utilisez les standalone components
- Naming : `kebab-case` pour les fichiers, `camelCase` pour les variables
- Typez les objets et返回值

### Git

- Messages de commit en anglais ou français
- Format : `type(scope): description`
  - `feat(auth): add login endpoint`
  - `fix(courses): resolve search filter issue`

## Structure des commits

```
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
docs:     Documentation uniquement
style:    Formatage du code
refactor: Refactoring
test:     Ajout/modification de tests
chore:    Tâches de maintenance
```

## Ressources

- [Documentation Spring Boot](https://spring.io/projects/spring-boot)
- [Documentation Angular](https://angular.io/docs)
- [Guide Git](https://git-scm.com/book/fr/v2)

## Remerciements

Merci à tous les contributeurs !
