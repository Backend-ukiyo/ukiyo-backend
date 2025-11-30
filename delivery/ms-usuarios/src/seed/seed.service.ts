import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../modulos/usuarios/entities/usuario.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async runSeed() {
        // limpiar bd
        await this.usuarioRepository.clear();

        // datos de prueba
        const usuarios = [
    {
        username: 'admin_ukiyo',
        password: '123456secure',
        clienteId: null,
    },
    {
        username: 'cliente_vip',
        password: '123456secure',
        clienteId: '00000000-0000-4000-8000-000000000001', 
    },
    ];

        await this.usuarioRepository.save(usuarios);
        return `SEED USUARIOS: ${usuarios.length} insertados.`;
    }
}
