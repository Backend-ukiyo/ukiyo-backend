import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as joi from 'joi';
import { dot } from 'node:test/reporters';

dotenv.config({ path: 'apps/api-gateway/deploy/.env' });

interface EnvVars {
    PORT: number;
    MS_USUARIOS_PORT: number;
    MS_USUARIOS_HOST: string; 
    }

    const envsSchema = joi.object({
    PORT: joi.number().required(),
    MS_USUARIOS_PORT: joi.number().required(),
    MS_USUARIOS_HOST: joi.string().required(),
    })
    .unknown(true);

    const { error, value } = envsSchema.validate(process.env);

    if (error) throw new Error(`Config validation error: ${error.message}`);
    
    const envVars: EnvVars = value;

    export const envs = {
    port: envVars.PORT,
    usuarios: {
        host: process.env.MS_USUARIOS_HOST || 'ms-usuarios', // Fallback al nombre docker
        port: envVars.MS_USUARIOS_PORT,
    }
};