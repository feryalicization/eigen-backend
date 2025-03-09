import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
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
    private readonly jwtService: JwtService,
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
      role: { connect: { id: createUserDto.role.id } },
      createdBy: currentUser?.id ?? null,
      createdAt: new Date()
    };
  
    return this.userRepository.createUser(userInput);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, currentUser: UserWithRole) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    if (currentUser.role?.name !== 'Admin' && currentUser.id !== id) {
      throw new UnauthorizedException('You can only update your own profile');
    }

    return this.userRepository.updateUser(id, {
      ...updateUserDto,
      updatedBy: currentUser.id,
      updatedAt: new Date(),
    });
  }

  async deleteUser(id: number, currentUser: UserWithRole) {
    if (currentUser.role?.name !== 'Admin') {
      throw new UnauthorizedException('Only admin can delete users');
    }
  
    return this.userRepository.softDeleteUser(id, currentUser.id);
  }

  async restoreUser(id: number, currentUser: UserWithRole) {
    if (currentUser.role?.name !== 'Admin') {
      throw new UnauthorizedException('Only admin can restore users');
    }
  
    return this.userRepository.restoreUser(id);
  }

  async getUsers(): Promise<PrismaUser[]> {
    return this.userRepository.findAllUsers();
  }

  async validateUser(email: string, password: string): Promise<PrismaUser & { role: Role }> {
    const user = await this.userRepository.findByEmail(email);
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return user as PrismaUser & { role: Role }; 
  }
  

  async generateToken(user: PrismaUser & { role: Role }): Promise<string> {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role?.name 
    };
  
    return this.jwtService.sign(payload);
  }
  
  
  
}
