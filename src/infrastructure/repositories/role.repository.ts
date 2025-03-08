import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Role } from 'src/domain/entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async createRole(name: string): Promise<Role> {
    return this.prisma.role.create({ data: { name } });
  }

  async findAllRoles(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }
}
