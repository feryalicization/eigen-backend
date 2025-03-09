import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { BookService } from 'src/application/services/book.service';
import { CreateBookDto } from 'src/application/dto/create-book.dto';
import { UpdateBookDto } from 'src/application/dto/update-book.dto';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number };
}

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.bookService.createBook(createBookDto, userId);
  }

  @Get()
  async findAll() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.getBookById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.bookService.updateBook(Number(id), updateBookDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.bookService.softDeleteBook(Number(id), userId);
  }
}
