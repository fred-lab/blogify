import { Entity, PrimaryGeneratedColumn, Column, Index, BeforeInsert } from "typeorm";
import { hash } from "../services/security";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 25 })
  firstName!: string;

  @Column({ type: "varchar", length: 25 })
  lastName!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 50, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 50 })
  password!: string;

  @Column({ enum: ["0", "1", "2", "3", "4"], enumName: "role" })
  role!: string;

  @Column({ default: false })
  isActive!: boolean;

  @BeforeInsert()
  async updateDates() {
    this.password = await hash(this.password);
  }
}
