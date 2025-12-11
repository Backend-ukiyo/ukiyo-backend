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
    
    pm2 delete api-gateway 2>/dev/null || true
    pm2 start pnpm --name "api-gateway" -- start:dev:gateway

    echo "   - Ver logs:    pm2 logs ms-usuarios"
    echo "   - Ver estado:  pm2 status"
    echo "   - Reiniciar:   pm2 restart ms-usuarios"
}
# tail -f /dev/null
main