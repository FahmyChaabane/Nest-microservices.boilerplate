import { Transport } from '@nestjs/microservices';
import { registerAs } from '@nestjs/config';

export const RmqOptionsConfig = registerAs('rmqOptions', () => ({
  transport: Transport.RMQ,
  options: {
    urls: [
      `${process.env.RMQ_PROTOCOL}://${process.env.RMQ_HOST}:${parseInt(
        process.env.RMQ_PORT,
      )}`,
    ],
    queue: process.env.RQM_QUEUE,
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
