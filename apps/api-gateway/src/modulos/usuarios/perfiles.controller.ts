import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../config';
import { CreatePerfilDto } from '@ukiyo/common';

@Controller('perfiles')
    export class PerfilesController {
    constructor(
        @Inject(USUARIOS_SERVICE) private readonly client: ClientProxy,
    ) {}

    @Post()
    create(@Body() createPerfilDto: CreatePerfilDto) {
        return this.client.send({ cmd: 'create_perfil' }, createPerfilDto).pipe(
        catchError((error) => {
            throw new RpcException(error);
        }),
        );
    }

    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.client.send({ cmd: 'find_perfil_by_user' }, userId).pipe(
        catchError((error) => {
            throw new RpcException(error);
        }),
        );
    }
}