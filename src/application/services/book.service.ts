import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(createBookDto: CreateBookDto, createdBy: number) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        createdBy, 
        createdAt: new Date(), 
      },
    });
  }

  async getAllBooks() {
    return this.prisma.book.findMany({
      where: { deletedAt: null }, 
    });
  }

  async getBookById(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book || book.deletedAt) throw new NotFoundException('Book not found');
    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto, updatedBy: number) {
    return this.prisma.book.update({
      where: { id },
      data: {
        ...updateBookDto,
        updatedBy, 
        updatedAt: new Date(), 
      },
    });
  }

  async softDeleteBook(id: number, deletedBy: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book || book.deletedAt) throw new NotFoundException('Book not found');

    return this.prisma.book.update({
      where: { id },
      data: {
        deletedAt: new Date(), 
        deletedBy, 
      },
    });
  }
}
