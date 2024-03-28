/*
  Warnings:

  - Added the required column `recipeId` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingredients` ADD COLUMN `recipeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
