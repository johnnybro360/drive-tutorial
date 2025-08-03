ALTER TABLE `drive_tutorial_files` CHANGE `user_id` `owner_id`;--> statement-breakpoint
ALTER TABLE `drive_tutorial_folders` CHANGE `user_id` `owner_id`;--> statement-breakpoint
DROP INDEX `owner_index` ON `drive_tutorial_files`;--> statement-breakpoint
CREATE INDEX `owner_index` ON `drive_tutorial_files` (`owner_id`);--> statement-breakpoint
DROP INDEX `owner_index` ON `drive_tutorial_folders`;--> statement-breakpoint
CREATE INDEX `owner_index` ON `drive_tutorial_folders` (`owner_id`);