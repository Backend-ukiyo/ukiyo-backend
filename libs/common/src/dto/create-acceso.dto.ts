import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateAccesoDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    ipOrigen: string;

    @IsString()
    @IsNotEmpty()
    resultado: string;
}