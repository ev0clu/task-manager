import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['RED', 'GREEN', 'BLUE'], {
    message: 'Valid color required',
  })
  @IsNotEmpty()
  color: 'RED' | 'GREEN' | 'BLUE';
}
