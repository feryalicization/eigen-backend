import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';
import { isAfter } from 'date-fns';

@Injectable()
export class BorrowService {
  constructor(private readonly prisma: PrismaService) {}

  async borrowBook({ userId, bookId }: BorrowBookDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { borrows: true },
    });

    const book = await this.prisma.book.findUnique({ where: { id: bookId } });

    if (!user) throw new NotFoundException('User not found');
    if (!book) throw new NotFoundException('Book not found');
    if (user.isPenalty && user.penaltyUntil && isAfter(new Date(), user.penaltyUntil)) {
      throw new BadRequestException('User is under penalty and cannot borrow books');
    }
    if (user.borrows.length >= 2) throw new BadRequestException('User cannot borrow more than 2 books');
    if (book.quantity < 1) throw new BadRequestException('Book is currently unavailable');

    await this.prisma.borrow.create({
      data: {
        userId,
        bookId,
        dueDate: addDays(new Date(), 7), // 7 days from borrowing date
      },
    });

    await this.prisma.book.update({
      where: { id: bookId },
      data: { quantity: { decrement: 1 } },
    });

    return { message: 'Book borrowed successfully' };
  }

  async returnBook({ userId, bookId }: ReturnBookDto) {
    const borrow = await this.prisma.borrow.findFirst({
      where: { userId, bookId },
    });

    if (!borrow) throw new NotFoundException('Borrow record not found');

    const isLate = isAfter(new Date(), borrow.dueDate);
    let penaltyUntil: Date | null = null;

    if (isLate) {
      penaltyUntil = addDays(new Date(), 3);
      await this.prisma.user.update({
        where: { id: userId },
        data: { isPenalty: true, penaltyUntil },
      });
    }

    await this.prisma.borrow.delete({ where: { id: borrow.id } });

    await this.prisma.book.update({
      where: { id: bookId },
      data: { quantity: { increment: 1 } },
    });

    return { message: 'Book returned successfully', penaltyUntil };
  }

  async checkBooks() {
    return this.prisma.book.findMany({
      where: {
        quantity: {
          not: 0, 
        },
      },
    });
  }
  

  async checkMembers() {
    return this.prisma.user.findMany({
      where: {
        role: {
          name: 'Member', 
        },
      },
      include: {
        borrows: true,
      },
    });
  }
  
}

function addDays(date: Date, days: number): Date {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

