import { Controller, Post, Body, Delete, Param, Headers, Request as Req } from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { User as PrismaUser } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req): Promise<PrismaUser> {
    const currentUser = req.user; // Get authenticated user
    return this.userService.createUser(createUserDto, currentUser);
  }


  @Delete(':id')
  async delete(@Param('id') id: number, @Headers('role') role: string) {
    return this.userService.deleteUser(id, role);
  }
}
