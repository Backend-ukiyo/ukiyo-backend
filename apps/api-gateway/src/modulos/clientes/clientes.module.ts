import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientesController } from './clientes.controller';
import { envs, CLIENTES_SERVICE } from '../../../config';

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [ClientesController],
})
export class ClientesModule {}