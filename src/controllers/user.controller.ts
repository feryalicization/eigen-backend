import { 
  Controller, 
  Post, 
  Body, 
  Delete, 
  Param, 
  Patch, 
  Get,
  Request as Req, 
  UseGuards, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { LoginUserDto } from '../application/dto/login-user.dto';
import { User as PrismaUser } from '@prisma/client';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req): Promise<PrismaUser> {
    return this.userService.createUser(createUserDto, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(Number(id), updateUserDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number, @Req() req) {
    return this.userService.deleteUser(Number(id), req.user);
  }

  @Post(':id/restore')
  @UseGuards(JwtAuthGuard)
  async restoreUser(@Param('id') id: number, @Req() req) {
    return this.userService.restoreUser(Number(id), req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto.email, loginUserDto.password);
    const token = await this.userService.generateToken(user);
    return { 
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    };
}


}
