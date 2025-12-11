import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as joi from 'joi';
import { dot } from 'node:test/reporters';

dotenv.config({ path: 'apps/api-gateway/deploy/.env' });

interface EnvVars {
    GATEWAY_PORT: number;
    USUARIOS_TCP_PORT: number;
    USUARIOS_HOST: string; 
    CLIENTES_TCP_PORT: number;
    CLIENTES_HOST: string;
    PRODUCTOS_HOST: string;
    PRODUCTOS_PORT: number;
    }

    const envsSchema = joi.object({
    GATEWAY_PORT: joi.number().required(),
    USUARIOS_TCP_PORT: joi.number().required(),
    USUARIOS_HOST: joi.string().required(),
    PRODUCTOS_HOST: joi.string().required(),
    PRODUCTOS_PORT: joi.number().required(), 
    })
    .unknown(true);

    const { error, value } = envsSchema.validate(process.env);

    if (error) throw new Error(`Config validation error: ${error.message}`);
    
    const envVars: EnvVars = value;

    export const envs = {
    port: envVars.GATEWAY_PORT,
    usuarios: {
        host: process.env.USUARIOS_HOST || 'ms_usuarios', // Fallback al nombre docker
        port: envVars.USUARIOS_TCP_PORT,
    },
    clientes: {
        host: process.env.CLIENTES_HOST || 'ms_clientes',
        port: envVars.CLIENTES_TCP_PORT,
    },
    productos: {
    host: process.env.PRODUCTOS_HOST || 'ms_productos',
    port: envVars.PRODUCTOS_PORT,
    },
};