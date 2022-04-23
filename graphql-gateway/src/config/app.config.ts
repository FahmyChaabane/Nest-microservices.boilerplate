import { registerAs } from '@nestjs/config';

export const userMicroserviceClientName = 'AUTH_TCP_SERVICE';
export const userMicroserviceConfig = registerAs('usermicroservice', () => ({
  options: {
    host: process.env.TCP_HOST,
    port: parseInt(process.env.TCP_PORT),
  },
}));

export const appconfig = registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT),
}));
