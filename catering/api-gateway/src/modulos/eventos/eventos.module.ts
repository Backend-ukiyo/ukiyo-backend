import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENTOS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.EVENTOS_HOST || 'ms_cat_eventos',
          port: parseInt(process.env.EVENTOS_PORT) || 4004,
        },
      },
    ]),
  ],
  controllers: [EventosController],
  providers: [EventosService],
})
export class EventosModule {}