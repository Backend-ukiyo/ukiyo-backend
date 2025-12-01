import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '@ukiyo/common';
import { Usuario } from './entities/ms-usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuariosRepository.create({
      username: createDto.username,
      password: createDto.password,
      rol: createDto.rol || 'cliente',
      esEmpleado: createDto.esEmpleado || false,
      clienteId: createDto.clienteId,
    });
    return await this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuariosRepository.find();
  }

  async findOne(id: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOne({ where: { id } });
  }

  async update(id: string, updateDto: Partial<CreateUsuarioDto>): Promise<Usuario | null> {
    await this.usuariosRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usuariosRepository.delete(id);
  }

}