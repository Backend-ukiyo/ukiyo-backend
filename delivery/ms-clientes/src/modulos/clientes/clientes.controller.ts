import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClientesService } from './clientes.service';

@Controller()
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @MessagePattern({ cmd: 'get_cliente' })
  obtenerDatosCliente(@Payload() clienteId: string) {
    return this.clientesService.findOne(clienteId);
  }

  @MessagePattern({ cmd: 'create_cliente' })
  crearCliente(@Payload() data: any) {
    return this.clientesService.create(data);
  }
}