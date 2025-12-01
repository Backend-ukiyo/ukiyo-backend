import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    MS_PORT: number;
    
    // Base de Datos
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;

    // Otros servicios
    CLIENTES_HOST: string;
    CLIENTES_PORT: number;
    }

    const envsSchema = joi.object({
    MS_PORT: joi.number().required(),
    
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),

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
    port: envVars.MS_PORT,
    db: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USERNAME,
        password: envVars.DB_PASSWORD,
        name: envVars.DB_DATABASE,
    },
    clientes: {
        host: envVars.CLIENTES_HOST,
        port: envVars.CLIENTES_PORT,
    }
};