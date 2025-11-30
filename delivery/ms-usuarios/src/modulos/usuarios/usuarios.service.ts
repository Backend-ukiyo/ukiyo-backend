import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async findOne(id: string) {
    return await this.usuariosRepository.findOne({ where: { id } });
  }

  async create(data: any) {
    // Crea la instancia del usuario
    const nuevoUsuario = this.usuariosRepository.create(data);
    
    // Guarda en la BD
    return await this.usuariosRepository.save(nuevoUsuario);
  }
}