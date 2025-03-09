import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Denta Kimu', required: false })
  name?: string;

  @ApiProperty({ example: 'denta@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '1234', required: false })
  password?: string;

  @ApiProperty({ example: 3, required: false })
  roleId?: number;

  @ApiProperty({ example: true, required: false })
  isActive?: boolean;

  @ApiProperty({ example: false, required: false })
  isPenalty?: boolean;

  @ApiProperty({ example: 2, required: false })
  updatedBy?: number;
}
