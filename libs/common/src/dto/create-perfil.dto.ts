import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePerfilDto {
  @IsNumber()
  userId: number; // Necesitamos saber a quién pertenece

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;
}