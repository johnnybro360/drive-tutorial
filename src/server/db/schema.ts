import { int, text, index, singlestoreTableCreator, bigint, timestamp } from "drizzle-orm/singlestore-core";

// export const users = singlestoreTable("users_table", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });

const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`
)

export const files_table = createTable("files", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),
  name: text("name").notNull(),
  ownerId: text("owner_id").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  size: int("size").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (table) => [
  index("parent_index").on(table.parent),
  index("owner_index").on(table.ownerId),
]);



export const folders_table = createTable("folders", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  ownerId: text("owner_id").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (table) => [
  index("parent_index").on(table.parent),
  index("owner_index").on(table.ownerId),
]);

