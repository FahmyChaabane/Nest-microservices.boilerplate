import { Transport } from '@nestjs/microservices';
import { registerAs } from '@nestjs/config';

// app config
export const jwt_secret_config = registerAs('jwt_secret', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

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
    queue: process.env.MOVIE_RQM_QUEUE,
  },
}));

// anime microservice config
export const animeMicroserviceClientName = 'ANIME_RMQ_SERVICE';
export const animeMicroserviceConfig = registerAs('animemicroservice', () => ({
  transport: Transport.RMQ,
  options: {
    urls: [
      `${process.env.RMQ_PROTOCOL}://${process.env.RMQ_HOST}:${parseInt(
        process.env.RMQ_PORT,
      )}`,
    ],
    queue: process.env.ANIME_RQM_QUEUE,
  },
}));

// app config
export const appconfig = registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT),
}));
