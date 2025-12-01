import { Controller, Get, Post, Body, Param, Inject, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    @Inject('CLIENTES_SERVICE') private readonly clientesClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createUserDto: any) {
    if (createUserDto.clienteId) {
      try {
        const clienteExiste = await lastValueFrom(
          this.clientesClient.send({ cmd: 'get_cliente' }, createUserDto.clienteId)
        );

        if (!clienteExiste) {
          throw new BadRequestException('El clienteId proporcionado no existe en la base de datos.');
        }
      } catch (error) {
        if (error instanceof BadRequestException) throw error;
        throw new BadRequestException('Error validando el cliente: ' + error.message);
      }
    }

    return this.usuariosService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }
}