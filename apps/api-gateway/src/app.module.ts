import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { SeedModule } from './modulos/seed/seed.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { AuthController } from './modulos/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    ClientesModule,
    ProductosModule,
    SeedModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}