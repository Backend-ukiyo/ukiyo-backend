import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '@ukiyo/common';
import { CreateClienteDto, UpdateClienteDto } from '@ukiyo/common';

@Injectable()
export class ClientesService {
    private readonly logger = new Logger(ClientesService.name);

    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>,
    ) {}

    async create(createDto: CreateClienteDto) {
        this.logger.log(`Creando cliente: ${createDto.email}`);
        const cliente = this.clienteRepo.create(createDto);
        return await this.clienteRepo.save(cliente);
    }

    async findAll() {
        return await this.clienteRepo.find();
    }

    async findOne(id: string) {
        const cliente = await this.clienteRepo.findOneBy({ id });
        if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    }

    async update(id: string, updateDto: UpdateClienteDto) {
        const cliente = await this.findOne(id);
        this.clienteRepo.merge(cliente, updateDto);
        return await this.clienteRepo.save(cliente);
    }

    async remove(id: string) {
        const cliente = await this.findOne(id);
        return await this.clienteRepo.remove(cliente);
    }
}