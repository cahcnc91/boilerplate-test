import { Length, IsEmail, Min } from "class-validator";
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExists';

@InputType()
class PasswordInput {
  @Field()
  @Min(4)
  password: string
}

@InputType()
export class RegisterInput extends PasswordInput {

  @Field() 
  @Length(1,30)
  firstName: string;

  @Length(1,30)
  @Field() lastName: string;

  @IsEmail()
  @IsEmailAlreadyExist({message: "Email already in use"})
  @Field() email: string;
}

@InputType()
export class ChangePasswordInput extends PasswordInput {

  @Field()
  token: string;
}