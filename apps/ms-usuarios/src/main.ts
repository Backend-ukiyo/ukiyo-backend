import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions, RpcException } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { envs } from '../config/envs';

async function bootstrap() {
  const logger = new Logger('MS-Usuarios');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // 🛠️ ESTA ES LA SOLUCIÓN MÁGICA:
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
        });
        
        return new RpcException({
          message: messages,
          statusCode: 400,
          error: 'Bad Request'
        });
      },
    }),
  );

  await app.listen();
  logger.log(`Microservicio de usuarios corriendo en NATS servers: ${envs.natsServers}`);
}
bootstrap();