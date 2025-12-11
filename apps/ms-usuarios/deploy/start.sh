#!/bin/bash
set -e

config.git(){
    git clone https://github.com/Backend-ukiyo/ukiyo-backend.git
}

#....

main(){
    npm install -g pnpm
    npm install -g pm2

    pnpm install --frozen-lockfile

    echo "Data Base: $DB_NAME"

    cd apps/ms-usuarios
    pnpm exec prisma generate

    pnpm exec prisma migrate deploy
    
    cd ../..
    
    pm2 delete ms-usuarios 2>/dev/null || true
    
    pm2 start pnpm --name "ms-usuarios" -- start:dev:usuarios

    echo "   - Ver logs:    pm2 logs ms-usuarios"
    echo "   - Ver estado:  pm2 status"
    echo "   - Reiniciar:   pm2 restart ms-usuarios"
}
# tail -f /dev/null
main