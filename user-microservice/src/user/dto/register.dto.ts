import { IsDate, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsDate()
  birth: Date;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
