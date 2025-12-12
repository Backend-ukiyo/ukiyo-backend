import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as joi from 'joi';
import { dot } from 'node:test/reporters';

// if (process.env.NODE_ENV !== 'production') {

//   const path = require('path');

//   const dotenv = require('dotenv');

//   const envFilePath = path.resolve(process.cwd(), 'apps/ms-usuarios/deploy/.env');

//   dotenv.config({ path: envFilePath });
// }

dotenv.config({ path: 'apps/ms-productos/deploy/.env' });

interface EnvVars {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    db: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USERNAME,
        password: envVars.DB_PASSWORD,
        name: envVars.DB_DATABASE,
    },
};