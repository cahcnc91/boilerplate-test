import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { redis } from "../redis";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { forgotPassword } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./Inputs";
import { MyContext } from '../types/MyContent';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPassword + token);

    if (!userId) {
      return null;
    }

    let user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(forgotPassword + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}
