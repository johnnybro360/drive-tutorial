CREATE TABLE `drive-tutorial_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`parent` int NOT NULL,
	`size` int NOT NULL,
	CONSTRAINT `drive-tutorial_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive-tutorial_files` (`parent`);--> statement-breakpoint
CREATE TABLE `drive-tutorial_folders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent` int,
	CONSTRAINT `drive-tutorial_folders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive-tutorial_folders` (`parent`);