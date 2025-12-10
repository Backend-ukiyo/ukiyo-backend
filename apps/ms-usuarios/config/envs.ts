import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as joi from 'joi';
import { dot } from 'node:test/reporters';

dotenv.config({ path: 'apps/ms-usuarios/deploy/.env' });

interface EnvVars {
  PORT: number;
  DATABASE_URL: string; // Variable para Prisma
  
  // Variables viejas 
  CLIENTES_HOST: string;
  CLIENTES_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
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
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL, 
  
  clientes: {
    host: envVars.CLIENTES_HOST,
    port: envVars.CLIENTES_PORT,
  }
};