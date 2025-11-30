import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PedidosService {
    constructor(
        @Inject('PEDIDOS_SERVICE') private readonly pedidosClient: ClientProxy,
    ) {}

    async create(createPedidoDto: any) {
        return this.pedidosClient.send({ cmd: 'create_pedido' }, createPedidoDto);
    }

    async findAll() {
        return await lastValueFrom(
        this.pedidosClient.send({ cmd: 'get_all_pedidos' }, {})
        );
    }

    async findOne(id: string) {
        return await lastValueFrom(
        this.pedidosClient.send({ cmd: 'get_pedido' }, id)
        );
    }

    async update(id: string, updatePedidoDto: any) {
        return this.pedidosClient.send({ cmd: 'update_pedido' }, { id, ...updatePedidoDto });
    }

    async remove(id: string) {
        return this.pedidosClient.send({ cmd: 'delete_pedido' }, id);
    }
}