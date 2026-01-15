import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { envs, USUARIOS_SERVICE, CLIENTES_SERVICE } from '../../../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USUARIOS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
      {
        name: CLIENTES_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}