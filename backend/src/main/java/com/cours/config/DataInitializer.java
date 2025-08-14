package com.cours.config;

import com.cours.entity.Course;
import com.cours.entity.User;
import com.cours.repository.CourseRepository;
import com.cours.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Créer des utilisateurs de test
        createTestUsers();
        createTestCourses();
    }

    private void createTestUsers() {
        if (userRepository.count() == 0) {
            // Professeurs
            User teacher1 = new User("Mathieu", "Dubois", "mathieu.dubois@email.com",
                    passwordEncoder.encode("password123"), User.Role.TEACHER);
            teacher1.setBio(
                    "Professeur de mathématiques expérimenté avec 10 ans d'expérience. Spécialisé en algèbre et géométrie.");
            teacher1.setHourlyRate(35.0);
            teacher1.setPhone("06 12 34 56 78");
            teacher1.setAddress("Paris, France");

            User teacher2 = new User("Sophie", "Martin", "sophie.martin@email.com",
                    passwordEncoder.encode("password123"), User.Role.TEACHER);
            teacher2.setBio(
                    "Professeure de français passionnée. J'aide les élèves à améliorer leur expression écrite et orale.");
            teacher2.setHourlyRate(30.0);
            teacher2.setPhone("06 23 45 67 89");
            teacher2.setAddress("Lyon, France");

            User teacher3 = new User("Pierre", "Leroy", "pierre.leroy@email.com",
                    passwordEncoder.encode("password123"), User.Role.TEACHER);
            teacher3.setBio("Professeur d'anglais natif. Cours particuliers et préparation aux examens Cambridge.");
            teacher3.setHourlyRate(40.0);
            teacher3.setPhone("06 34 56 78 90");
            teacher3.setAddress("Marseille, France");

            User teacher4 = new User("Marie", "Garcia", "marie.garcia@email.com",
                    passwordEncoder.encode("password123"), User.Role.TEACHER);
            teacher4.setBio("Professeure de physique-chimie. Méthodologie et résolution de problèmes.");
            teacher4.setHourlyRate(38.0);
            teacher4.setPhone("06 45 67 89 01");
            teacher4.setAddress("Toulouse, France");

            User teacher5 = new User("Thomas", "Rousseau", "thomas.rousseau@email.com",
                    passwordEncoder.encode("password123"), User.Role.TEACHER);
            teacher5.setBio("Professeur d'histoire-géographie. Préparation au bac et méthodologie.");
            teacher5.setHourlyRate(32.0);
            teacher5.setPhone("06 56 78 90 12");
            teacher5.setAddress("Bordeaux, France");

            // Élèves
            User student1 = new User("Marie", "Dupont", "marie.dupont@email.com",
                    passwordEncoder.encode("password123"), User.Role.STUDENT);
            student1.setPhone("06 67 89 01 23");
            student1.setAddress("Paris, France");

            User student2 = new User("Thomas", "Bernard", "thomas.bernard@email.com",
                    passwordEncoder.encode("password123"), User.Role.STUDENT);
            student2.setPhone("06 78 90 12 34");
            student2.setAddress("Lyon, France");

            List<User> users = Arrays.asList(teacher1, teacher2, teacher3, teacher4, teacher5, student1, student2);
            userRepository.saveAll(users);
        }
    }

    private void createTestCourses() {
        if (courseRepository.count() == 0) {
            User teacher1 = userRepository.findByEmail("mathieu.dubois@email.com").orElse(null);
            User teacher2 = userRepository.findByEmail("sophie.martin@email.com").orElse(null);
            User teacher3 = userRepository.findByEmail("pierre.leroy@email.com").orElse(null);
            User teacher4 = userRepository.findByEmail("marie.garcia@email.com").orElse(null);
            User teacher5 = userRepository.findByEmail("thomas.rousseau@email.com").orElse(null);

            if (teacher1 != null) {
                Course course1 = new Course("Mathématiques - Niveau Lycée",
                        "Cours de mathématiques pour lycéens. Algèbre, géométrie, trigonométrie.",
                        "Mathématiques", "Lycée", new BigDecimal("35.00"), teacher1);
                course1.setOnline(true);
                course1.setInPerson(true);
                course1.setRequirements("Calculatrice scientifique");

                Course course2 = new Course("Préparation Bac Mathématiques",
                        "Révision intensive pour le bac de mathématiques. Exercices types et méthodologie.",
                        "Mathématiques", "Terminale", new BigDecimal("40.00"), teacher1);
                course2.setOnline(true);
                course2.setInPerson(false);

                courseRepository.saveAll(Arrays.asList(course1, course2));
            }

            if (teacher2 != null) {
                Course course3 = new Course("Français - Expression écrite",
                        "Amélioration de l'expression écrite. Rédaction, dissertation, commentaire de texte.",
                        "Français", "Tous niveaux", new BigDecimal("30.00"), teacher2);
                course3.setOnline(true);
                course3.setInPerson(true);

                Course course4 = new Course("Préparation Bac Français",
                        "Révision pour l'épreuve de français du bac. Analyse de textes et méthodologie.",
                        "Français", "Première", new BigDecimal("35.00"), teacher2);
                course4.setOnline(true);
                course4.setInPerson(true);

                courseRepository.saveAll(Arrays.asList(course3, course4));
            }

            if (teacher3 != null) {
                Course course5 = new Course("Anglais - Conversation",
                        "Cours d'anglais conversationnel. Amélioration de l'expression orale et compréhension.",
                        "Anglais", "Tous niveaux", new BigDecimal("40.00"), teacher3);
                course5.setOnline(true);
                course5.setInPerson(false);

                Course course6 = new Course("Préparation Cambridge",
                        "Préparation aux examens Cambridge (FCE, CAE, CPE). Grammaire et vocabulaire.",
                        "Anglais", "Avancé", new BigDecimal("45.00"), teacher3);
                course6.setOnline(true);
                course6.setInPerson(true);

                courseRepository.saveAll(Arrays.asList(course5, course6));
            }

            if (teacher4 != null) {
                Course course7 = new Course("Physique - Mécanique",
                        "Cours de physique mécanique. Cinématique, dynamique, énergie.",
                        "Physique", "Lycée", new BigDecimal("38.00"), teacher4);
                course7.setOnline(true);
                course7.setInPerson(true);

                Course course8 = new Course("Chimie - Réactions",
                        "Cours de chimie. Équilibres chimiques, réactions acide-base.",
                        "Chimie", "Lycée", new BigDecimal("38.00"), teacher4);
                course8.setOnline(true);
                course8.setInPerson(true);

                courseRepository.saveAll(Arrays.asList(course7, course8));
            }

            if (teacher5 != null) {
                Course course9 = new Course("Histoire - XXe siècle",
                        "Histoire du XXe siècle. Guerres mondiales, décolonisation, guerre froide.",
                        "Histoire", "Lycée", new BigDecimal("32.00"), teacher5);
                course9.setOnline(true);
                course9.setInPerson(true);

                Course course10 = new Course("Géographie - Mondialisation",
                        "Géographie de la mondialisation. Flux, territoires, développement.",
                        "Géographie", "Lycée", new BigDecimal("32.00"), teacher5);
                course10.setOnline(true);
                course10.setInPerson(true);

                courseRepository.saveAll(Arrays.asList(course9, course10));
            }
        }
    }
}
