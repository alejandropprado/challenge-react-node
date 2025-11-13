import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../../shared/config/env";
import { PostEntity } from "../../posts/infrastructure/orm/post.entity";

const isTs = !!process.env.TS_NODE || process.argv.some(a => a.includes('ts-node'));

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  entities: [PostEntity],
  synchronize: false,
  migrations: [
    isTs
      ? "src/infrastructure/database/migrations/*.ts"
      : "dist/infrastructure/database/migrations/*.js",
  ],
});
