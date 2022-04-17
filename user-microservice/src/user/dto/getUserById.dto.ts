import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserByIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
