import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsuariosController } from './usuarios.controller';
import { envs, USUARIOS_SERVICE } from '../../../config';

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
  controllers: [UsuariosController],
})
export class UsuariosModule {}