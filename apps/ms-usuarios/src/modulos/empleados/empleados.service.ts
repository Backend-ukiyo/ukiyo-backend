import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEmpleadoDto } from '@ukiyo/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmpleadosService {
    private readonly logger = new Logger('EmpleadosService');

    constructor(private readonly prisma: PrismaService) {}

    async create(createEmpleadoDto: CreateEmpleadoDto) {
        try {
        return await this.prisma.empleado.create({
            data: createEmpleadoDto as any,
        });
        } catch (error) {
        throw new RpcException(error);
        }
    }

    async findByUserId(userId: string) {
        return await this.prisma.empleado.findUnique({
        where: { userId },
        });
    }
}