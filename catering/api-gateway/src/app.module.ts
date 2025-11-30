import { Module } from '@nestjs/common';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { PedidosModule } from './modulos/pedidos/pedidos.module';
import { EventosModule } from './modulos/eventos/eventos.module';

@Module({
  imports: [
    UsuariosModule,
    ClientesModule,
    PedidosModule,
    EventosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}