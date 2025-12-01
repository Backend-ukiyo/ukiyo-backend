import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USUARIOS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USUARIOS_HOST || 'ms_usuarios',
          port: parseInt(process.env.USUARIOS_PORT || '3001'),
        },
      },
      {
        name: 'CLIENTES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.CLIENTES_HOST || 'ms_clientes',
          port: parseInt(process.env.CLIENTES_PORT || '3000'),
        },
      },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}