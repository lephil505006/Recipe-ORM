/*
  Warnings:

  - You are about to drop the column `cookTime` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `prepTime` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `servingSize` on the `recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recipes` DROP COLUMN `cookTime`,
    DROP COLUMN `prepTime`,
    DROP COLUMN `servingSize`;
