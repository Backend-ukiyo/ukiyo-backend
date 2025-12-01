import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    // Configuración para conectar con MS Usuarios
    USUARIOS_HOST: string;
    USUARIOS_PORT: number;
    // Configuración para conectar con MS Clientes
    CLIENTES_HOST: string;
    CLIENTES_PORT: number;
    }

    const envsSchema = joi.object({
    PORT: joi.number().required(),
    
    USUARIOS_HOST: joi.string().required(),
    USUARIOS_PORT: joi.number().required(),
    
    CLIENTES_HOST: joi.string().required(),
    CLIENTES_PORT: joi.number().required(),
    })
    .unknown(true);

    const { error, value } = envsSchema.validate(process.env);

    if (error) {
    throw new Error(`Config validation error: ${error.message}`);
    }

    const envVars: EnvVars = value;

    export const envs = {
    port: envVars.PORT,
    usuarios: {
        host: envVars.USUARIOS_HOST,
        port: envVars.USUARIOS_PORT,
    },
    clientes: {
        host: envVars.CLIENTES_HOST,
        port: envVars.CLIENTES_PORT,
    },
};