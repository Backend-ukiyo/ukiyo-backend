import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/pedidos')
export class PedidosController {
  constructor(
    @Inject('PEDIDOS_SERVICE') private readonly pedidosClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createDto: any) {
    return this.pedidosClient.send({ cmd: 'create_pedido' }, createDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosClient.send({ cmd: 'get_pedido' }, id);
  }
  
  @Get()
  findAll() {
    return this.pedidosClient.send({ cmd: 'get_all_pedidos' }, {});
  }
}