// src/infrastructure/db/migrations/1700000000000-CreatePosts.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePosts1700000000000 implements MigrationInterface {
  name = "CreatePosts1700000000000";
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id uuid PRIMARY KEY,
        name varchar(255) NOT NULL,
        description text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL
      );
    `);
  }
  public async down(qr: QueryRunner): Promise<void> {
    await qr.query("DROP TABLE IF EXISTS posts;");
  }
}
