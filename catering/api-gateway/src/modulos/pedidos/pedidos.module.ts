import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PedidosController } from './pedidos.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PEDIDOS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PEDIDOS_HOST || 'ms_cat_pedidos',
          port: parseInt(process.env.PEDIDOS_PORT) || 4003,
        },
      },
    ]),
  ],
  controllers: [PedidosController],
})
export class PedidosModule {}