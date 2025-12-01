import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    USUARIOS_TCP_PORT: number;
    USUARIOS_DB_HOST: string;
    USUARIOS_DB_PORT: number;
    USUARIOS_DB_USER: string;
    USUARIOS_DB_PASS: string;
    USUARIOS_DB_NAME: string;
}

const envsSchema = joi.object({
    USUARIOS_TCP_PORT: joi.number().required(),
    USUARIOS_DB_HOST: joi.string().required(),
    USUARIOS_DB_PORT: joi.number().required(),
    USUARIOS_DB_USER: joi.string().required(),
    USUARIOS_DB_PASS: joi.string().required(),
    USUARIOS_DB_NAME: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
    port: envVars.USUARIOS_TCP_PORT,
    db: {
        host: envVars.USUARIOS_DB_HOST,
        port: envVars.USUARIOS_DB_PORT,
        username: envVars.USUARIOS_DB_USER,
        password: envVars.USUARIOS_DB_PASS,
        database: envVars.USUARIOS_DB_NAME,
    },
};