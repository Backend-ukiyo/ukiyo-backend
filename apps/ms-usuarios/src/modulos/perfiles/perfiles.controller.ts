import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PerfilesService } from './perfiles.service';
import { CreatePerfilDto, UpdatePerfilDto } from '@ukiyo/common';

@Controller()
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @MessagePattern({ cmd: 'create_perfil' })
  create(@Payload() createPerfilDto: CreatePerfilDto) {
    return this.perfilesService.create(createPerfilDto);
  }

  @MessagePattern({ cmd: 'find_perfil_by_user' })
  findByUser(@Payload('userId') userId: number) {
    return this.perfilesService.findByUserId(userId);
  }
}