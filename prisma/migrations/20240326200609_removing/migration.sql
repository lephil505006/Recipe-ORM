/*
  Warnings:

  - Added the required column `cookTime` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTime` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipes` ADD COLUMN `cookTime` INTEGER NOT NULL,
    ADD COLUMN `prepTime` INTEGER NOT NULL,
    ADD COLUMN `servingSize` INTEGER NOT NULL;
