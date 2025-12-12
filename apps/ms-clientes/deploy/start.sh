#!/bin/bash
set -e

wait_for_db() {
    echo "Esperando a Base de Datos ($DB_HOST:5432)"
    until nc -z -v -w30 "$DB_HOST" 5432; do
        echo "Esperando conexión a BD..."
        sleep 2
    done
    echo "Base de datos conectada."
}

main(){

    npm install -g npm@11.7.0 pnpm pm2

    echo "Instalando dependencias..."

    pnpm install --frozen-lockfile

    echo "Base de Datos objetivo: $DB_NAME en $DB_HOST"

    wait_for_db

    cd apps/ms-clientes
    
    pnpm exec prisma generate
    pnpm exec prisma migrate deploy
    
    cd ../..
    
    echo "Arrancando PM2"
    pm2 delete ms-clientes 2>/dev/null || true
    pm2 start pnpm --name "ms-clientes" -- start:dev:clientes
    
    echo "MS-CLIENTES ONLINE"
}

main

pm2 logs ms-clientes