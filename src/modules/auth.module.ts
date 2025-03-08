import { Module } from '@nestjs/common';
import { JwtStrategy } from '../infrastructure/auth/jwt.strategy';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [JwtStrategy, PrismaService],
  exports: [JwtStrategy],
})
export class AuthModule {}
