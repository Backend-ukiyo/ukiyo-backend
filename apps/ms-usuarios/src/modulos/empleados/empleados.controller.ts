import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from '@ukiyo/common';

@Controller()
export class EmpleadosController {
    constructor(private readonly empleadosService: EmpleadosService) {}

    @MessagePattern({ cmd: 'create_empleado' })
    create(@Payload() createEmpleadoDto: CreateEmpleadoDto) {
        return this.empleadosService.create(createEmpleadoDto);
    }
    
}