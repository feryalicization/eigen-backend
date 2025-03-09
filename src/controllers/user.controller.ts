import { 
  Controller, 
  Post, 
  Body, 
  Delete, 
  Param, 
  Headers, 
  Request as Req, 
  UseGuards,
  UsePipes,
  ValidationPipe 
} from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { User as PrismaUser } from '@prisma/client';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard'; 
import { LoginUserDto } from '../application/dto/login-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth() 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req): Promise<PrismaUser> {
    const currentUser = req.user; 
    return this.userService.createUser(createUserDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  async delete(@Param('id') id: number, @Headers('role') role: string) {
    return this.userService.deleteUser(id, role);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto.email, loginUserDto.password);
    const token = await this.userService.generateToken(user);
    return { access_token: token };
  }
}
