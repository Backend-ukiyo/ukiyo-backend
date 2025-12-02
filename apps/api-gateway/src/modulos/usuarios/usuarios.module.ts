import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { envs, USUARIOS_SERVICE, CLIENTES_SERVICE } from '../../../config';

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
      {
        name: CLIENTES_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.clientes.host,
          port: envs.clientes.port,
        },
      },
    ]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}