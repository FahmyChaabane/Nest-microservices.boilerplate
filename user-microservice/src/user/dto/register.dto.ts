import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  birth: Date;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
