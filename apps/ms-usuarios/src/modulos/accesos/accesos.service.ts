import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAccesoDto } from '@ukiyo/common';

@Injectable()
export class AccesosService {
  private readonly logger = new Logger(AccesosService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createAccesoDto: CreateAccesoDto) {
    return await this.prisma.acceso.create({
      data: {
        userId: createAccesoDto.userId,
        ipOrigen: createAccesoDto.ipOrigen,
        resultado: createAccesoDto.resultado,
      },
    });
  }

  async findAllByUser(userId: string) {
    return await this.prisma.acceso.findMany({
      where: { userId },
      orderBy: { fechaHora: 'desc' },
    });
  }
}