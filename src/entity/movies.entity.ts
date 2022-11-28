import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Movies {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  synopsis: string;

  @ManyToOne(() => User, (user) => user.username)
  @JoinColumn({ name: "userCreator" })
  userCreator: User;
}
