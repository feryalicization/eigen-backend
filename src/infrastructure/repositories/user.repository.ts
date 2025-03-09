import { Injectable, NotFoundException  } from '@nestjs/common';
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

    return this.prisma.user.create({
      data: { ...data, code: newCode },
      include: { role: true },
    });
  }

  async updateUser(id: number, data: Partial<PrismaUser>): Promise<PrismaUser> {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        isActive: data.isActive,
        isPenalty: data.isPenalty,
        updatedBy: data.updatedBy,
        updatedAt: new Date(),
  
        ...(data.roleId && { role: { connect: { id: data.roleId } } }),
      },
    });
  }
  
  async findUserById(id: number): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { id, isActive: true },
      include: { role: true },
    });
  }

  async softDeleteUser(id: number, deletedBy: number): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
        isActive: true,   
      },
    });
  
    if (!user) {
      throw new NotFoundException('User not found or already deleted');
    }
  
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy,
        isActive: false, 
      },
    });
  
    return { message: 'User deleted successfully' };
  }
  

  async restoreUser(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: null,
        deletedBy: null,
      },
    });
  }

  async findAllUsers(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany({
      where: { deletedAt: null }, 
      include: { role: true },
    });
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null }, 
      include: { role: true },
    });
  }
  
}
