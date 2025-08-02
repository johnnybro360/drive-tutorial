CREATE TABLE `__new_drive-tutorial_files` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`parent` bigint unsigned NOT NULL,
	`size` int NOT NULL,
	CONSTRAINT `drive-tutorial_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_drive-tutorial_files`(`id`, `name`, `url`, `parent`, `size`) SELECT `id`, `name`, `url`, `parent`, `size` FROM `drive-tutorial_files`;--> statement-breakpoint
DROP TABLE `drive-tutorial_files`;--> statement-breakpoint
ALTER TABLE `__new_drive-tutorial_files` RENAME TO `drive-tutorial_files`;--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive-tutorial_files` (`parent`);--> statement-breakpoint
CREATE TABLE `__new_drive-tutorial_folders` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent` bigint unsigned,
	CONSTRAINT `drive-tutorial_folders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_drive-tutorial_folders`(`id`, `name`, `parent`) SELECT `id`, `name`, `parent` FROM `drive-tutorial_folders`;--> statement-breakpoint
DROP TABLE `drive-tutorial_folders`;--> statement-breakpoint
ALTER TABLE `__new_drive-tutorial_folders` RENAME TO `drive-tutorial_folders`;--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive-tutorial_folders` (`parent`);