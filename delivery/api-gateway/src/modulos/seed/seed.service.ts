import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SeedService {
    constructor(
        @Inject('USUARIOS_SERVICE') private readonly usuariosClient: ClientProxy,
        @Inject('CLIENTES_SERVICE') private readonly clientesClient: ClientProxy,
    ) {}

    async runFullSeed() {
        const [clientesResult, usuariosResult] = await Promise.all([
        lastValueFrom(this.clientesClient.send({ cmd: 'seed_clientes' }, {})),
        lastValueFrom(this.usuariosClient.send({ cmd: 'seed_usuarios' }, {})),
        ]);

        return {
        mensaje: 'SEED EJECUTADO CORRECTAMENTE',
        detalles: {
            clientes: clientesResult,
            usuarios: usuariosResult,
        },
        };
    }
}