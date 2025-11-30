import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EventosService {
    constructor(
        @Inject('EVENTOS_SERVICE') private readonly eventosClient: ClientProxy,
    ) {}

    async create(createEventoDto: any) {
        return this.eventosClient.send({ cmd: 'create_evento' }, createEventoDto);
    }

    async findAll() {
        return await lastValueFrom(
        this.eventosClient.send({ cmd: 'get_all_eventos' }, {})
        );
    }

    async findOne(id: string) {
        return await lastValueFrom(
        this.eventosClient.send({ cmd: 'get_evento' }, id)
        );
    }

    async update(id: string, updateEventoDto: any) {
        return this.eventosClient.send({ cmd: 'update_evento' }, { id, ...updateEventoDto });
    }

    async remove(id: string) {
        return this.eventosClient.send({ cmd: 'delete_evento' }, id);
    }
}