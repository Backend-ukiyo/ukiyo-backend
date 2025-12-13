import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PerfilesModule } from './modulos/perfiles/perfiles.module';
import { EmpleadosModule } from './modulos/empleados/empleados.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/ms-usuarios/.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    // PrismaModule se importa dentro de UsuariosModule
    UsuariosModule,
    PerfilesModule,
    EmpleadosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}