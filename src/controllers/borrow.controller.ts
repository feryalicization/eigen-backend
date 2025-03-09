import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { BorrowService } from 'src/application/services/borrow.service';
import { BorrowBookDto, ReturnBookDto } from 'src/application/dto/borrow.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard';

@Controller('borrow')
@ApiTags('Borrow')
@ApiBearerAuth() 
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  @UseGuards(JwtAuthGuard) 
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    return this.borrowService.borrowBook(borrowBookDto);
  }

  @Post('return')
  @UseGuards(JwtAuthGuard) 
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    return this.borrowService.returnBook(returnBookDto);
  }

  @Get('books')
  @UseGuards(JwtAuthGuard) 
  async checkBooks() {
    return this.borrowService.checkBooks();
  }

  @Get('members')
  @UseGuards(JwtAuthGuard) 
  async checkMembers() {
    return this.borrowService.checkMembers();
  }
}
