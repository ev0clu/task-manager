import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH'], {
    message: 'Valid priority required',
  })
  @IsNotEmpty()
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
