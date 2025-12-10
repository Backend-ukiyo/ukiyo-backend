import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '@ukiyo/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsuariosService implements OnModuleInit {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.logger.log('MS-Usuarios conectado a BD con Prisma');
  }

  async create(createDto: CreateUsuarioDto) {
    this.logger.log(`Creando usuario: ${createDto.username}`);

    try {
      return await this.prisma.usuario.create({
        data: {
          username: createDto.username,
          passwordHash: createDto.password, 
          rol: createDto.rol || 'cliente',
          esEmpleado: createDto.esEmpleado || false,
          clienteId: createDto.clienteId,
        },
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll() {
    return await this.prisma.usuario.findMany();
  }

  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      return null; 
    }

    return usuario;
  }

  async update(id: string, updateDto: any) {
    return await this.prisma.usuario.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.usuario.delete({
      where: { id },
    });
  }
}