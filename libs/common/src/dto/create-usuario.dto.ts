import { IsString, IsBoolean, IsOptional, IsUUID, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorators';

export class CreateUsuarioDto {

    @IsString()
    username: string;

    @IsString()
    @Match('password', { message: 'Las contraseñas no coinciden' })
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