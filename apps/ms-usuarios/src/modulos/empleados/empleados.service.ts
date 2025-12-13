import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEmpleadoDto } from '@ukiyo/common';

@Injectable()
export class EmpleadosService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('EmpleadosService');

    async onModuleInit() {
        await this.$connect();
    }

    async create(createEmpleadoDto: CreateEmpleadoDto) {
        return this.empleado.create({
        data: createEmpleadoDto,
        });
    }

    async findByUserId(userId: number) {
        return this.empleado.findUnique({
        where: { userId },
        });
    }
}