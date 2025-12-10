#!/bin/bash
set -e

config.git(){
    git clone https://github.com/Backend-ukiyo/ukiyo-backend.git
}

#....

main(){
    # config_git
    npm install -g npm@11.6.4
    npm install -g npm@11.7.0
    npm install -g pnpm
    pnpm install --frozen-lockfile
    pnpm run start:dev:usuarios

}
tail -f /dev/null
# main