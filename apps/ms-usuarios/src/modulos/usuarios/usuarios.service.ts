import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AccesosService } from '../accesos/accesos.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '@ukiyo/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService implements OnModuleInit {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly accesosService: AccesosService,
  ) {}

  async onModuleInit() {
    this.logger.log('MS-Usuarios conectado a BD con Prisma');
  }

  async create(createDto: CreateUsuarioDto) {
    this.logger.log(`Creando usuario: ${createDto.username}`);

    try {
      const { password, ...userData } = createDto;
      
      const hashedPassword = await bcrypt.hash(password, 10);

      return await this.prisma.usuario.create({
        data: {
          username: createDto.username,
          email:    createDto.email,
          password: hashedPassword,
          roles:    ['USER'],
          isActive: true,
        },
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      where: { isActive: true },
    });
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

  async findByUsernameOrEmail(term: string) {
    return await this.prisma.usuario.findFirst({
      where: {
        OR: [
          { email: term },
          { username: term },
        ],
        isActive: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateUsuarioDto) {
    const { id: _, ...data } = updateDto;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      return await this.prisma.usuario.update({
        where: { id },
        data: data as any,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async remove(id: string) {
    return await this.prisma.usuario.update({
      where: { id },
      data: { isActive: false },
    });
  }
}