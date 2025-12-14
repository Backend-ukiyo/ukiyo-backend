import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USUARIOS_SERVICE, envs } from '../../../config';

@Module({
    imports: [
        ClientsModule.register([
        {
            name: USUARIOS_SERVICE,
            transport: Transport.TCP,
            options: {
            host: envs.usuarios.host,
            port: envs.usuarios.port,
            },
        },
        ]),
    ],
    controllers: [AuthController],
    providers: [],
    })
export class AuthModule {}