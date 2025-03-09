import { Module } from '@nestjs/common';
import { BorrowService } from 'src/application/services/borrow.service';
import { BorrowController } from 'src/controllers/borrow.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BorrowController],
  providers: [BorrowService, PrismaService],
  exports: [BorrowService],
})
export class BorrowModule {}
