import { Module } from '@nestjs/common';
import { RoleService } from 'src/application/services/role.service';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';
import { RoleController } from 'src/controllers/role.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RoleService, RoleRepository, PrismaService],
  controllers: [RoleController],
})
export class RoleModule {}
