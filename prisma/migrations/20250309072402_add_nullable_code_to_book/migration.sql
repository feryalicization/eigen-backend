/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN "code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Book_code_key" ON "Book"("code");
