import { Transport } from '@nestjs/microservices';
import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jsonwebtoken', () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: parseInt(process.env.JWT_EXPIRATION),
  },
}));

export const tcpOptionsConfig = registerAs('microservice', () => ({
  transport: Transport.TCP,
  options: {
    host: process.env.TCP_HOST,
    port: parseInt(process.env.TCP_PORT),
    retryAttempts: parseInt(process.env.TCP_RETRY_ATTEMPTS),
    retryDelay: parseInt(process.env.TCP_RETRY_DELAY),
  },
}));

export const databaseConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
}));

export const appconfig = registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT),
}));
