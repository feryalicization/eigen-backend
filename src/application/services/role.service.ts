import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';
import { CreateRoleDto } from 'src/application/dto/create-role.dto';
import { UpdateRoleDto } from 'src/application/dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository, private readonly prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.createRole(createRoleDto.name);
  }

  async findAllRoles() {
    return this.roleRepository.findAllRoles({
      where: {
        deletedAt: null, 
      },
    });
  }

  async findRoleById(id: number) {
    const role = await this.roleRepository.findRoleById(id);
    if (!role || role.deletedAt) throw new NotFoundException(`Role with ID ${id} not found`);
    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    if (!updateRoleDto.name) {
      throw new Error('Role name is required'); 
    }
    
    return this.roleRepository.updateRole(id, updateRoleDto.name);
  }
  

  async deleteRole(id: number, userId: number) {
    const role = await this.roleRepository.findRoleById(id);
    if (!role || role.deletedAt) throw new NotFoundException(`Role with ID ${id} not found`);

    return this.prisma.role.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: userId,
      },
    });
  }
}
