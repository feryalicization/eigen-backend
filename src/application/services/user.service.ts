import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User as PrismaUser, Role, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


interface UserWithRole extends PrismaUser {
  role?: Role; 
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService 
  ) {}

  async createUser(createUserDto: CreateUserDto, currentUser?: UserWithRole): Promise<PrismaUser> {
    if (currentUser && currentUser.role?.name !== 'Admin') {
      throw new UnauthorizedException('Only admin can create users');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
    const userInput: Prisma.UserCreateInput = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      isActive: createUserDto.isActive ?? true,
      isPenalty: createUserDto.isPenalty ?? false,
      role: {
        connect: { id: createUserDto.role.id }, 
      },
    };
  
    return this.userRepository.createUser(userInput);
  }
  
  

  async deleteUser(id: number, role: string) {
    if (role !== 'Admin') throw new UnauthorizedException('Only admin can delete users');
    return this.userRepository.deleteUser(id);
  }

  async validateUser(email: string, password: string): Promise<PrismaUser> {
    const user = await this.userRepository.findByEmail(email); 
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async generateToken(user: any): Promise<string> {
    const payload = { sub: user.id, email: user.email, role: user.roleId };
    return this.jwtService.sign(payload);
  }
}
