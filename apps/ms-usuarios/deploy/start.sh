#!/bin/bash
set -e

# Función para esperar a que la BD esté lista
wait_for_db() {
    echo "Esperando a que la Base de Datos ($DB_HOST:$DB_PORT) esté lista..."
        until nc -z -v -w30 "$DB_HOST" 5432; do
    echo "Esperando BD"
        sleep 2
        done
    echo "Base de datos conectada."
}

main(){
    echo "Iniciando configuración automática"

    npm install -g npm@11.7.0
    npm install -g pnpm
    npm install -g pm2

    echo "Instalando dependencias"

    pnpm install --frozen-lockfile

    echo "Base de datos: $DB_NAME en $DB_HOST"

    wait_for_db 

    cd apps/ms-usuarios
    
    pnpm exec prisma generate
    pnpm exec prisma migrate deploy
    
    cd ../..
    
    echo "Arrancando PM2.."
    pm2 delete ms-usuarios 2>/dev/null || true
    pm2 start pnpm --name "ms-usuarios" -- start:dev:usuarios
    
    echo "MS-USUARIOS ESTÁ ONLINE"
}

main

# Mantener el contenedor vivo mostrando los logs
pm2 logs ms-usuarios