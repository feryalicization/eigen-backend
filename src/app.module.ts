import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './modules/user.module';
import { RoleModule } from './modules/role.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, RoleModule, ConfigModule.forRoot({ isGlobal: true })], 
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
