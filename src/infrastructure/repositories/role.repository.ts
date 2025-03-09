import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(name: string) {
    return this.prisma.role.create({
      data: { name },
    });
  }

  async findAllRoles(whereCondition = {}) {
    return this.prisma.role.findMany({
      where: {
        deletedAt: null, 
      }      
    });
  }
  

  async findRoleById(id: number) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async updateRole(id: number, name: string) {
    return this.prisma.role.update({
      where: { id },
      data: { name },
    });
  }
}
