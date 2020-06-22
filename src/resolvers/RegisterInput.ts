import { Length, IsEmail } from "class-validator";
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExists';

@InputType()
export class RegisterInput {

  @Field() 
  @Length(1,30)
  firstName: string;

  @Length(1,30)
  @Field() lastName: string;

  @IsEmail()
  @IsEmailAlreadyExist({message: "Email already in use"})
  @Field() email: string;

  @Field() password: string
}