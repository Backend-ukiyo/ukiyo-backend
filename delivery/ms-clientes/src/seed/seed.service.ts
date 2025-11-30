import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../modulos/clientes/entities/cliente.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    async runSeed() {
        // limpia la tabla
        await this.clienteRepository.clear();

        // datos de prueba
        const clientes = [
        {
            id: '00000000-0000-4000-8000-000000000001', 
            nombre: 'Restaurante Ukiyo (Sede Central)',
            email: 'contacto@ukiyo.com',
            telefono: '911222333',
        },
        {
            nombre: 'Juan Pérez (Particular)',
            email: 'juan.perez@gmail.com',
            telefono: '600555666',
        },
        ];

        await this.clienteRepository.save(clientes);
        return `SEED CLIENTES: ${clientes.length} insertados.`;
    }
}