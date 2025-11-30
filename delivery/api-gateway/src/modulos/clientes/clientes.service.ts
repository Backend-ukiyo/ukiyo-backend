import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientesService {
  constructor(
    @Inject('CLIENTES_SERVICE') private readonly clientesClient: ClientProxy,
  ) {}

  async create(createClienteDto: any) {
    return this.clientesClient.send({ cmd: 'create_cliente' }, createClienteDto);
  }

  async findOne(id: string) {
    return await lastValueFrom(
      this.clientesClient.send({ cmd: 'get_cliente' }, id)
    );
  }
}