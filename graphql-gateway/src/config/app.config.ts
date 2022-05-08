import { Transport } from '@nestjs/microservices';
import { registerAs } from '@nestjs/config';

// user microservice config
export const userMicroserviceClientName = 'AUTH_TCP_SERVICE';
export const userMicroserviceConfig = registerAs('usermicroservice', () => ({
  transport: Transport.TCP,
  options: {
    host: process.env.TCP_HOST,
    port: parseInt(process.env.TCP_PORT),
  },
}));

// movie microservice config
export const movieMicroserviceClientName = 'MOVIE_RMQ_SERVICE';
export const movieMicroserviceConfig = registerAs('moviemicroservice', () => ({
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

// app config
export const appconfig = registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT),
}));
