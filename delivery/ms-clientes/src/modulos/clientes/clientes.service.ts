import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
    constructor(
    @InjectRepository(Cliente)
        private clientesRepository: Repository<Cliente>,
    ) {}

    // Metódo findOne que se llama desde clienes controller
    async findOne(clienteId: string): Promise<Cliente> {
    
    // Búsqueda en bd clientes
    const cliente = await this.clientesRepository.findOne({ 
        where: { id: clienteId } 
    });

    if (!cliente) {
        // Devolverá null o lanzará una excepción si no se encuentra
        throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado.`);
    }
        return cliente;
    }

    async create(data: any) {
        const nuevoCliente = this.clientesRepository.create(data);
        return await this.clientesRepository.save(nuevoCliente);
    }

}