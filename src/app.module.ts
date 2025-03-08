import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './modules/user.module';
import { RoleModule } from './modules/role.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UserModule, RoleModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule], 
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
