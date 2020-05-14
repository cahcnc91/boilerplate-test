import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {length: 255})
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    addId(){
        this.id = uuidv4();
    }

}
