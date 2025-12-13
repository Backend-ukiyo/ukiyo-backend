import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // <--- Usamos el servicio central
import { CreatePerfilDto } from '@ukiyo/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PerfilesService {
    private readonly logger = new Logger('PerfilesService');

    constructor(private readonly prisma: PrismaService) {}

    async create(createPerfilDto: CreatePerfilDto) {
        try {
        return await this.prisma.perfil.create({
            data: createPerfilDto as any,
        });
        } catch (error) {
        throw new RpcException(error);
        }
    }

    async findByUserId(userId: string) {
        return await this.prisma.perfil.findUnique({
        where: { userId },
        });
    }
}