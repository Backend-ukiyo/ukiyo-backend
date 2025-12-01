import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '@ukiyo/common';

@Controller()
export class UsuariosController {
  constructor(private readonly msUsuariosService: UsuariosService) {}

  // 1. Crear Usuario
  @MessagePattern({ cmd: 'create_usuario' })
  create(@Payload() createMsUsuarioDto: CreateUsuarioDto) {
    return this.msUsuariosService.create(createMsUsuarioDto);
  }

  // 2. Obtener todos
  @MessagePattern({ cmd: 'get_all_usuarios' })
  findAll() {
    return this.msUsuariosService.findAll();
  }

  // 3. Obtener uno por ID
  @MessagePattern({ cmd: 'get_usuario' })
  findOne(@Payload() id: string) {
    return this.msUsuariosService.findOne(id);
  }

  // 4. Actualizar
  @MessagePattern({ cmd: 'update_usuario' })
  update(@Payload() payload: { id: string; data: UpdateUsuarioDto }) {
    return this.msUsuariosService.update(payload.id, payload.data);
  }

  // 5. Eliminar
  @MessagePattern({ cmd: 'delete_usuario' })
  remove(@Payload() id: string) {
    return this.msUsuariosService.remove(id);
  }
}