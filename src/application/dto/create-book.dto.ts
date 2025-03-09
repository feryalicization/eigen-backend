import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'SHR-1' }) 
  @IsString()
  @IsNotEmpty()
  code: string;
  
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
