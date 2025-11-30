import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsuariosService } from './usuarios.service';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //obtener usuario
  @MessagePattern({ cmd: 'get_usuario' })
  async getUsuario(@Payload() id: string) {
    return this.usuariosService.findOne(id);
  }

  //crear usuario
  @MessagePattern({ cmd: 'create_usuario' })
  createUsuario(@Payload() data: any) {
    return this.usuariosService.create(data);
  }
  
}