import { IsString, IsEmail, IsInt, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class RoleConnectDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;
}

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
  
  @ApiProperty({ type: RoleConnectDto }) 
  @ValidateNested()
  @Type(() => RoleConnectDto)
  role: RoleConnectDto; 

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPenalty?: boolean;
}
