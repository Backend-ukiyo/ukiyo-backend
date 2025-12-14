import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccesosService } from './accesos.service';
import { CreateAccesoDto } from '@ukiyo/common';

@Controller()
export class AccesosController {
  constructor(private readonly accesosService: AccesosService) {}

  @MessagePattern('create_acceso')
  create(@Payload() createAccesoDto: CreateAccesoDto) {
    return this.accesosService.create(createAccesoDto);
  }

  @MessagePattern('find_accesos_by_user')
  findAllByUser(@Payload() id: string) {
    return this.accesosService.findAllByUser(id);
  }
}