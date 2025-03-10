import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './modules/user.module';
import { RoleModule } from './modules/role.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { BookModule } from './modules/book.module';
import { BorrowModule } from './modules/borrow.module';

@Module({
  imports: [UserModule, RoleModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, BookModule, BorrowModule], 
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
