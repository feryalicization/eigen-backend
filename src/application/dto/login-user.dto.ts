import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ example: 'fery@example.com' }) 
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '1234' }) 
  password: string;
}
