import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "posts" })
export class PostEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ name: "name", type: "varchar", length: 255 })
  name!: string;

  @Column({ name: "description", type: "text" })
  description!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
  deletedAt!: Date | null;
}
