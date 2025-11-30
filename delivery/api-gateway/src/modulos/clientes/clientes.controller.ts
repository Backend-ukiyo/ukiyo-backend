import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('api/clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: any) {
    return this.clientesService.create(createClienteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id);
  }
}