import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    MS_PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    }

    const envsSchema = joi.object({
    // Puerto TCP del microservicio
    MS_PORT: joi.number().required(),
    
    // Configuración Base de Datos
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
    })
    .unknown(true); // Permite otras variables no definidas

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
};