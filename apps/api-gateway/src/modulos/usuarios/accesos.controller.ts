import { Controller, Get, Inject, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../config';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('usuarios')
export class AccesosController {
    constructor(
        @Inject(USUARIOS_SERVICE) private readonly client: ClientProxy,
    ) {}

    @UseGuards(AuthGuard)
    @Get(':id/accesos')
    findAllByUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('find_accesos_by_user', id).pipe(
        catchError((error) => {
            throw new RpcException(error);
        }),
        );
    }
}