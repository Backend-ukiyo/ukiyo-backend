import { IsString, IsBoolean, IsOptional, IsUUID, MinLength } from 'class-validator';

export class CreateUsuarioDto {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    rol?: string;

    @IsBoolean()
    @IsOptional()
    esEmpleado?: boolean;

    @IsUUID()
    @IsOptional()
    clienteId?: string;
    
}