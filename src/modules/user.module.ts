import { Module } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default_secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [UserService, UserRepository, PrismaService],
  controllers: [UserController],
  exports: [UserService], 
})
export class UserModule {}
