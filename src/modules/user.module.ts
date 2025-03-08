import { Module } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserService, UserRepository, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
