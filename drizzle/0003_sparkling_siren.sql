ALTER TABLE `drive-tutorial_files` RENAME TO `drive_tutorial_files`;--> statement-breakpoint
ALTER TABLE `drive-tutorial_folders` RENAME TO `drive_tutorial_folders`;--> statement-breakpoint
ALTER TABLE `drive_tutorial_files` ADD `user_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `drive_tutorial_files` ADD `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
CREATE INDEX `owner_index` ON `drive_tutorial_files` (`user_id`);--> statement-breakpoint
ALTER TABLE `drive_tutorial_folders` ADD `user_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `drive_tutorial_folders` ADD `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
CREATE INDEX `owner_index` ON `drive_tutorial_folders` (`user_id`);