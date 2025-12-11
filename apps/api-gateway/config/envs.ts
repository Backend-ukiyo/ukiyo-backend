import * as joi from 'joi';

if (process.env.NODE_ENV !== 'production') {
    const path = require('path');
    const dotenv = require('dotenv');
    const envFilePath = path.resolve(process.cwd(), 'apps/api-gateway/.env');
    dotenv.config({ path: envFilePath });
}

interface EnvVars {
    GATEWAY_PORT: number;
    
    // Usuarios
    USUARIOS_TCP_PORT: number;
    USUARIOS_HOST: string;
    
    // Clientes
    CLIENTES_TCP_PORT: number;
    CLIENTES_HOST: string;

    // Productos
    PRODUCTOS_TCP_PORT: number;
    PRODUCTOS_HOST: string;
}

const envsSchema = joi.object({
    GATEWAY_PORT: joi.number().required(),
    
    // Validaciones Usuarios
    USUARIOS_TCP_PORT: joi.number().required(),
    USUARIOS_HOST: joi.string().required(),

    // Validaciones Clientes
    CLIENTES_TCP_PORT: joi.number().required(),
    CLIENTES_HOST: joi.string().required(),

    // Validaciones Productos
    PRODUCTOS_TCP_PORT: joi.number().required(),
    PRODUCTOS_HOST: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.GATEWAY_PORT,
    usuarios: {
        host: envVars.USUARIOS_HOST,
        port: envVars.USUARIOS_TCP_PORT,
    },
    clientes: {
        host: envVars.CLIENTES_HOST,
        port: envVars.CLIENTES_TCP_PORT,
    },
    productos: {
        host: envVars.PRODUCTOS_HOST,
        port: envVars.PRODUCTOS_TCP_PORT,
    },
};