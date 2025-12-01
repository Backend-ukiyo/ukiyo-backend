import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    CLIENTES_TCP_PORT: number;
    CLIENTES_DB_HOST: string;
    CLIENTES_DB_PORT: number;
    CLIENTES_DB_USER: string;
    CLIENTES_DB_PASS: string;
    CLIENTES_DB_NAME: string;
}

const envsSchema = joi.object({
    CLIENTES_TCP_PORT: joi.number().required(),
    CLIENTES_DB_HOST: joi.string().required(),
    CLIENTES_DB_PORT: joi.number().required(),
    CLIENTES_DB_USER: joi.string().required(),
    CLIENTES_DB_PASS: joi.string().required(),
    CLIENTES_DB_NAME: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
    port: envVars.CLIENTES_TCP_PORT,
    db: {
        host: envVars.CLIENTES_DB_HOST,
        port: envVars.CLIENTES_DB_PORT,
        username: envVars.CLIENTES_DB_USER,
        password: envVars.CLIENTES_DB_PASS,
        database: envVars.CLIENTES_DB_NAME,
    },
};