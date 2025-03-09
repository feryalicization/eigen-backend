import { Module } from '@nestjs/common';
import { BookService } from 'src/application/services/book.service';
import { BookController } from 'src/controllers/book.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
  exports: [BookService],
})
export class BookModule {}
