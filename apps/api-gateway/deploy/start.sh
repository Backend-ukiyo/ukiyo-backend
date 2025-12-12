#!/bin/bash
set -e

main(){

    npm install -g npm@11.7.0
    npm install -g pnpm
    npm install -g pm2

    echo "Instalando dependencias"
    pnpm install --frozen-lockfile

    echo "Arrancando Gateway con PM2"
    
    # Limpieza preventiva
    pm2 delete api-gateway 2>/dev/null || true
    
    # Arrancamos el proceso
    pm2 start pnpm --name "api-gateway" -- start:dev:gateway

    echo "API-GATEWAY ONLINE (Puerto 3000)"
    
}

main

# Mantener el contenedor vivo mostrando logs
pm2 logs api-gateway