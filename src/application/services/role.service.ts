import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';
import { CreateRoleDto } from 'src/application/dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.createRole(createRoleDto.name);
  }

  async findAllRoles() {
    return this.roleRepository.findAllRoles();
  }
}
