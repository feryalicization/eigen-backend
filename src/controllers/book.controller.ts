import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BookService } from 'src/application/services/book.service';
import { CreateBookDto } from 'src/application/dto/create-book.dto';
import { UpdateBookDto } from 'src/application/dto/update-book.dto';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth() 
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  async findAll() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) 
  async findOne(@Param('id') id: string) {
    return this.bookService.getBookById(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) 
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(Number(id), updateBookDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  async remove(@Param('id') id: string) {
    return this.bookService.deleteBook(Number(id));
  }
}
