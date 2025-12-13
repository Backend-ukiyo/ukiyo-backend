import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePerfilDto } from '@ukiyo/common';

@Injectable()
export class PerfilesService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('PerfilesService');

    async onModuleInit() {
        await this.$connect();
    }

    async create(createPerfilDto: CreatePerfilDto) {
        return this.perfil.create({
        data: createPerfilDto,
        });
    }

    async findByUserId(userId: number) {
        return this.perfil.findUnique({
        where: { userId },
        });
    }
}