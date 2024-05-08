import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  secondName?: string;

  @Column()
  password: string;
}
