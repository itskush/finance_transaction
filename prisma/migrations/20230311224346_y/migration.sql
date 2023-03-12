/*
  Warnings:

  - Made the column `reference` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "reference" SET NOT NULL;
