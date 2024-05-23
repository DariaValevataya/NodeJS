-- CreateTable
CREATE TABLE `commits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repoId` INTEGER NULL,
    `message` VARCHAR(255) NULL,

    INDEX `fk_commits_repos`(`repoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `authorId` INTEGER NOT NULL,

    INDEX `fk_repos_users`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(16) NOT NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(32) NOT NULL,
    `role` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commits` ADD CONSTRAINT `fk_commits_repos` FOREIGN KEY (`repoId`) REFERENCES `repos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repos` ADD CONSTRAINT `fk_repos_users` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
