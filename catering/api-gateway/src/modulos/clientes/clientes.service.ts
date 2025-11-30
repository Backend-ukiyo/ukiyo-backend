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

    async findAll() {
        return await lastValueFrom(
        this.clientesClient.send({ cmd: 'get_all_clientes' }, {})
        );
    }

    async findOne(id: string) {
        return await lastValueFrom(
        this.clientesClient.send({ cmd: 'get_cliente' }, id)
        );
    }

    async update(id: string, updateClienteDto: any) {
        return this.clientesClient.send({ cmd: 'update_cliente' }, { id, ...updateClienteDto });
    }

    async remove(id: string) {
        return this.clientesClient.send({ cmd: 'delete_cliente' }, id);
    }
}