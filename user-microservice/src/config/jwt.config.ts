export const JwtConfig = {
  secret: 'havertz',
  signOptions: {
    expiresIn: 3600,
  },
};

export interface JwtPayload {
  id: number;
  email: string;
}
