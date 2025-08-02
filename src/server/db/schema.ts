import { int, text, index, singlestoreTableCreator, bigint } from "drizzle-orm/singlestore-core";
  
// export const users = singlestoreTable("users_table", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });

const createTable = singlestoreTableCreator(
  (name) => `drive-tutorial_${name}`
)

export const files = createTable("files", {
  id: bigint("id", { mode: "number", unsigned: true })
  .primaryKey()
  .autoincrement(),
    name: text("name").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  size: int("size").notNull(),
}, (table) => [
  index("parent_index").on(table.parent),
]);

export const folders = createTable("folders", {
  id: bigint("id", { mode: "number", unsigned: true })
  .primaryKey()
  .autoincrement(),
    name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
}, (table) => [
  index("parent_index").on(table.parent),
]);