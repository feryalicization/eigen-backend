/*
  Warnings:

  - Added the required column `dueDate` to the `Borrow` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_roleId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "penaltyUntil" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Borrow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrowedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" DATETIME,
    "dueDate" DATETIME NOT NULL,
    "isLate" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Borrow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Borrow" ("bookId", "borrowedAt", "id", "isLate", "returnedAt", "userId") SELECT "bookId", "borrowedAt", "id", "isLate", "returnedAt", "userId" FROM "Borrow";
DROP TABLE "Borrow";
ALTER TABLE "new_Borrow" RENAME TO "Borrow";
CREATE UNIQUE INDEX "Borrow_userId_bookId_key" ON "Borrow"("userId", "bookId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
