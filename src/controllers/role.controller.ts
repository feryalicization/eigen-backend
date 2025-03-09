import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  UseGuards, 
  Param, 
  Patch, 
  Delete, 
  Req 
} from '@nestjs/common';
import { RoleService } from 'src/application/services/role.service';
import { CreateRoleDto } from 'src/application/dto/create-role.dto';
import { UpdateRoleDto } from 'src/application/dto/update-role.dto';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number };
}

@Controller('roles')
@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id; 
    return this.roleService.createRole(createRoleDto, userId);
  }

  @Get()
  async findAll() {
    return this.roleService.findAllRoles();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.roleService.findRoleById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.roleService.updateRole(id, updateRoleDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id; 
    return this.roleService.deleteRole(id, userId);
  }
}
