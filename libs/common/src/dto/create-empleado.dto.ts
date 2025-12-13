import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateEmpleadoDto {
    @IsNumber()
    userId: number;

    @IsString()
    puesto: string;

    @IsNumber()
    salario: number;

    @IsString()
    @IsOptional()
    departamento?: string;
}