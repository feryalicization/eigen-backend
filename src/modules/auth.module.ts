import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../infrastructure/auth/jwt.strategy';
import { PrismaService } from '../prisma.service';  
import { PrismaModule } from '../modules/prisma.module';  



@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default_secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PrismaModule, // ✅ Ensure PrismaModule is imported
  ],
  providers: [JwtStrategy, PrismaService], // ✅ Provide PrismaService
  exports: [JwtStrategy],
})
export class AuthModule {}
