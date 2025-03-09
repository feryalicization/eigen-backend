import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(data: CreateBookDto) {
    return this.prisma.book.create({ data });
  }

  async getAllBooks() {
    return this.prisma.book.findMany();
  }

  async getBookById(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async updateBook(id: number, data: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async deleteBook(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
