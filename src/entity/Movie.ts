import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';
//import { User } from './User';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    title: string

    @Field(() => Int)
    @Column('int', {default:60})
    minutes: number

    @Field(() => Int)
    @Column('int')
    ownerId: number

    @Field()
    @OneToOne(() => User)
    @JoinColumn()
    owner: User
}