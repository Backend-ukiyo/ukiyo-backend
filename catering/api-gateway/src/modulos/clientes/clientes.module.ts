import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENTES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.CLIENTES_HOST || 'ms_cat_clientes',
          port: parseInt(process.env.CLIENTES_PORT) || 4002,
        },
      },
    ]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}