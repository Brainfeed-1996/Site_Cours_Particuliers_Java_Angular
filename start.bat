@echo off
echo ========================================
echo   CoursParticuliers - Plateforme E-commerce
echo ========================================
echo.
echo Demarrage de l'application...
echo.

echo [1/3] Demarrage du backend Spring Boot...
start "Backend" cmd /k "cd backend && mvn spring-boot:run"

echo [2/3] Attente du demarrage du backend...
timeout /t 10 /nobreak > nul

echo [3/3] Demarrage du frontend Angular...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Application demarree avec succes !
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:4200
echo H2 Console: http://localhost:8080/h2-console
echo.
echo Utilisateurs de test:
echo - Email: teacher@example.com / Password: password
echo - Email: student@example.com / Password: password
echo.
pause
