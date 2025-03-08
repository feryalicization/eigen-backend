import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { RoleService } from 'src/application/services/role.service';
import { CreateRoleDto } from 'src/application/dto/create-role.dto';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles')
@ApiBearerAuth() 
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  async findAll() {
    return this.roleService.findAllRoles();
  }
}
