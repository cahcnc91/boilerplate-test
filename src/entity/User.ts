import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Movie } from './Movie';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  name(@Root() parent: User):string{
    return `${parent.firstName} ${parent.lastName}`
  }

  @Column()
  password: string;

  @Column('bool', {default: false})
  confirmed: boolean;

  @Column("int", {default: 0})
  tokenVersion: number

  @OneToMany(() => Movie, movie => movie.owner)
  movies: Movie[];
}
