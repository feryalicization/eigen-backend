import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User as PrismaUser, Role, Prisma } from '@prisma/client';


interface UserWithRole extends PrismaUser {
  role?: Role; // ✅ Ensure role is included and optional
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto, currentUser: UserWithRole): Promise<PrismaUser> {
    if (currentUser.role?.name !== 'admin') {
      throw new UnauthorizedException('Only admin can create users');
    }
  
    const userInput: Prisma.UserCreateInput = {
      ...createUserDto,
      code: createUserDto.code ?? undefined, 
      role: { connect: { id: createUserDto.roleId } }, 
    };
  
    return this.userRepository.createUser(userInput);
  }
  

  async deleteUser(id: number, role: string) {
    if (role !== 'admin') throw new UnauthorizedException('Only admin can delete users');
    return this.userRepository.deleteUser(id);
  }
}
