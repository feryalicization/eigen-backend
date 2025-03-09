import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ example: 'Admin' }) 
  @IsString()
  @IsNotEmpty()
  name?: string;
}
