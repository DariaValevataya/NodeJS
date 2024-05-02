/*
  Warnings:

  - You are about to drop the column `auditorium` on the `auditorium` table. All the data in the column will be lost.
  - You are about to drop the column `auditoriumType` on the `auditorium_type` table. All the data in the column will be lost.
  - You are about to drop the column `pulpit` on the `pulpit` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `subjectMame` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `teacher` on the `teacher` table. All the data in the column will be lost.
  - Made the column `auditoriumName` on table `auditorium` required. This step will fail if there are existing NULL values in that column.
  - Made the column `auditoriumCapacity` on table `auditorium` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facultyName` on table `faculty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pulpitName` on table `pulpit` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `subjectName` to the `subject` table without a default value. This is not possible if the table is not empty.
  - Made the column `teacherName` on table `teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `auditorium` DROP FOREIGN KEY `auditorium_auditoriumTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `pulpit` DROP FOREIGN KEY `pulpit_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `subject_pulpitId_fkey`;

-- DropForeignKey
ALTER TABLE `teacher` DROP FOREIGN KEY `teacher_pulpitId_fkey`;

-- AlterTable
ALTER TABLE `auditorium` DROP COLUMN `auditorium`,
    MODIFY `auditoriumName` VARCHAR(191) NOT NULL,
    MODIFY `auditoriumCapacity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `auditorium_type` DROP COLUMN `auditoriumType`;

-- AlterTable
ALTER TABLE `faculty` MODIFY `facultyName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pulpit` DROP COLUMN `pulpit`,
    MODIFY `pulpitName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `subject`,
    DROP COLUMN `subjectMame`,
    ADD COLUMN `subjectName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teacher` DROP COLUMN `teacher`,
    MODIFY `teacherName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `pulpit` ADD CONSTRAINT `pulpit_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `faculty`(`facId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_pulpitId_fkey` FOREIGN KEY (`pulpitId`) REFERENCES `pulpit`(`pulpitId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher` ADD CONSTRAINT `teacher_pulpitId_fkey` FOREIGN KEY (`pulpitId`) REFERENCES `pulpit`(`pulpitId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auditorium` ADD CONSTRAINT `auditorium_auditoriumTypeId_fkey` FOREIGN KEY (`auditoriumTypeId`) REFERENCES `auditorium_type`(`auditoriumTypeId`) ON DELETE CASCADE ON UPDATE CASCADE;
