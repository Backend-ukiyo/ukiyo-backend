import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('USUARIOS_SERVICE') private readonly usuariosClient: ClientProxy,
  ) {}

  async create(createUserDto: any) {
    return this.usuariosClient.send({ cmd: 'create_usuario' }, createUserDto);
  }

  async findOne(id: string) {
    return await lastValueFrom(
      this.usuariosClient.send({ cmd: 'get_usuario' }, id)
    );
  }
}