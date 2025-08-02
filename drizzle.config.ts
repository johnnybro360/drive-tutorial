import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    url: env.SINGLESTORE_URL,
  },
  // tablesFilter: ["drive-tutorial_*"],
} satisfies Config;
