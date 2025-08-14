#!/bin/bash

echo "========================================"
echo "  CoursParticuliers - Plateforme E-commerce"
echo "========================================"
echo ""
echo "Demarrage de l'application..."
echo ""

echo "[1/3] Demarrage du backend Spring Boot..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

echo "[2/3] Attente du demarrage du backend..."
sleep 10

echo "[3/3] Demarrage du frontend Angular..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "  Application demarree avec succes !"
echo "========================================"
echo ""
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:4200"
echo "H2 Console: http://localhost:8080/h2-console"
echo ""
echo "Utilisateurs de test:"
echo "- Email: teacher@example.com / Password: password"
echo "- Email: student@example.com / Password: password"
echo ""
echo "Appuyez sur Ctrl+C pour arreter l'application"
echo ""

# Fonction pour nettoyer les processus
cleanup() {
    echo ""
    echo "Arret de l'application..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre que les processus se terminent
wait
