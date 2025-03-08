import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User as PrismaUser, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<PrismaUser> { 
    const lastUser = await this.prisma.user.findFirst({
      orderBy: { id: 'desc' },
    });
  
    const newCode = `M${String(lastUser?.id ? lastUser.id + 1 : 1).padStart(3, '0')}`;
  
    const user = await this.prisma.user.create({
      data: { ...data, code: newCode },
      include: { role: true },
    });
  
    return user; 
  }
  
  
  

  async findUserById(id: number): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true }, 
    });
  }
  

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true }, 
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
