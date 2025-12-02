import * as joi from 'joi';

if (process.env.NODE_ENV !== 'production') {

  const path = require('path');
  
  const dotenv = require('dotenv');

  const envFilePath = path.resolve(process.cwd(), 'apps/ms-usuarios/.env');
  
  dotenv.config({ path: envFilePath });
}

interface EnvVars {
  MS_PORT: number;
  DATABASE_URL: string; // Variable para Prisma
  
  // Variables viejas 
  CLIENTES_HOST: string;
  CLIENTES_PORT: number;
}

const envsSchema = joi.object({
  MS_PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(), // Validación obligatoria
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
  databaseUrl: envVars.DATABASE_URL, 
  
  clientes: {
    host: envVars.CLIENTES_HOST,
    port: envVars.CLIENTES_PORT,
  }
};