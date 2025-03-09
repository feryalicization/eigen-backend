import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Matematic Book' }) 
  @IsString()
  @IsNotEmpty()
  title: string;


  @ApiProperty({ example: 'fery' })
  @IsString()
  author: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  quantity: number;


}
