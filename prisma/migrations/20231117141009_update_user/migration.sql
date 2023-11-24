/*
  Warnings:

  - Added the required column `facebook` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitter` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT NOT NULL;
