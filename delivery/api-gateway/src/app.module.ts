import { Module } from '@nestjs/common';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { SeedModule } from './modulos/seed/seed.module';

@Module({
  imports: [
    UsuariosModule,
    ClientesModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}