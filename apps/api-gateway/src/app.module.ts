import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { SeedModule } from './modulos/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    ClientesModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}