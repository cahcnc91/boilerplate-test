import { Resolver, Mutation, Arg, Query, UseMiddleware } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "../Inputs";
import { isAuth } from '../../middleware/isAuth';
import { createConfirmationUrl } from '../../utils/createConfirmationUrl';
import { sendEmail } from '../../utils/sendEmail';
import { confirmationPassword } from '../../constants/redisPrefixes';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  // @Authorized()
  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail( confirmationPassword + email, await createConfirmationUrl(user.id))

    return user;
  }
}
