-- CreateTable
CREATE TABLE `faculty` (
    `facId` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyAbbr` VARCHAR(191) NOT NULL,
    `facultyName` VARCHAR(191) NULL,

    PRIMARY KEY (`facId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pulpit` (
    `pulpitId` INTEGER NOT NULL AUTO_INCREMENT,
    `pulpit` VARCHAR(191) NOT NULL,
    `pulpitName` VARCHAR(191) NULL,
    `facultyId` INTEGER NOT NULL,

    PRIMARY KEY (`pulpitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `subjectId` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(191) NOT NULL,
    `subjectMame` VARCHAR(191) NOT NULL,
    `pulpitId` INTEGER NOT NULL,

    PRIMARY KEY (`subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `teacherId` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher` VARCHAR(191) NOT NULL,
    `teacherName` VARCHAR(191) NULL,
    `pulpitId` INTEGER NOT NULL,

    PRIMARY KEY (`teacherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auditorium_type` (
    `auditoriumTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `auditoriumType` VARCHAR(191) NOT NULL,
    `auditoriumTypeName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`auditoriumTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auditorium` (
    `auditoriumId` INTEGER NOT NULL AUTO_INCREMENT,
    `auditorium` VARCHAR(191) NOT NULL,
    `auditoriumName` VARCHAR(191) NULL,
    `auditoriumCapacity` INTEGER NULL,
    `auditoriumTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`auditoriumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pulpit` ADD CONSTRAINT `pulpit_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `faculty`(`facId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_pulpitId_fkey` FOREIGN KEY (`pulpitId`) REFERENCES `pulpit`(`pulpitId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher` ADD CONSTRAINT `teacher_pulpitId_fkey` FOREIGN KEY (`pulpitId`) REFERENCES `pulpit`(`pulpitId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auditorium` ADD CONSTRAINT `auditorium_auditoriumTypeId_fkey` FOREIGN KEY (`auditoriumTypeId`) REFERENCES `auditorium_type`(`auditoriumTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
