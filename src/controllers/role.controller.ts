import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoleService } from 'src/application/services/role.service';
import { CreateRoleDto } from 'src/application/dto/create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  async findAll() {
    return this.roleService.findAllRoles();
  }
}
