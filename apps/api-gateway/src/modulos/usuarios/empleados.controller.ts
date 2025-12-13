import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../config';
import { CreateEmpleadoDto } from '@ukiyo/common';

@Controller('api/empleados')
export class EmpleadosController {
    constructor(
        @Inject(USUARIOS_SERVICE) private readonly client: ClientProxy,
    ) {}

    @Post()
    create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
        return this.client.send({ cmd: 'create_empleado' }, createEmpleadoDto).pipe(
        catchError((error) => {
            throw new RpcException(error);
        }),
        );
    }
}