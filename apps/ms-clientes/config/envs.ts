import * as joi from 'joi';
if (process.env.NODE_ENV !== 'production') {

    const path = require('path');

    const dotenv = require('dotenv');

    const envFilePath = path.resolve(process.cwd(), 'apps/ms-clientes/.env');
    dotenv.config({ path: envFilePath });
}

interface EnvVars {
    CLIENTES_TCP_PORT: number;
    CLIENTES_DB_HOST: string;
    CLIENTES_DB_PORT: number;
    CLIENTES_DB_USER: string;
    CLIENTES_DB_PASS: string;
    CLIENTES_DB_NAME: string;
    DATABASE_URL: string;
}

const envsSchema = joi.object({
    CLIENTES_TCP_PORT: joi.number().required(),
    CLIENTES_DB_HOST: joi.string().required(),
    CLIENTES_DB_PORT: joi.number().required(),
    CLIENTES_DB_USER: joi.string().required(),
    CLIENTES_DB_PASS: joi.string().required(),
    CLIENTES_DB_NAME: joi.string().required(),
    DATABASE_URL: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.CLIENTES_TCP_PORT,
    databaseUrl: envVars.DATABASE_URL,
    db: {
        host: envVars.CLIENTES_DB_HOST,
        port: envVars.CLIENTES_DB_PORT,
        username: envVars.CLIENTES_DB_USER,
        password: envVars.CLIENTES_DB_PASS,
        name: envVars.CLIENTES_DB_NAME,
    },
};