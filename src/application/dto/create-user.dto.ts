import { IsString, IsEmail, IsInt, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' }) 
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword' })
  @IsString()
  password: string;
  
  @ApiProperty({ example: 'M001', required: false }) 
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 1 }) 
  @IsInt()
  roleId: number; 

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPenalty?: boolean;
}
