import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { Usuario } from '@ukiyo/common';
import { envs } from '../config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.username,
      password: envs.db.password,
      database: envs.db.name,
      entities: [Usuario],
      synchronize: true, // true para desarrollo, false para producción
      autoLoadEntities: true,
    }),

    UsuariosModule,
  ],
})
export class AppModule {}