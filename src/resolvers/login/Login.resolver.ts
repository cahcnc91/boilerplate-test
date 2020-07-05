import { Resolver, Mutation, Arg, Ctx, Field, ObjectType, Int } from "type-graphql";
import * as bcrypt from 'bcryptjs'
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContent';
import { createRefreshToken, createAccessToken } from '../../utils/auth';
import { sendRefreshToken } from '../../utils/sendRefreshToken';
import { getConnection } from 'typeorm';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("bad password");
    }

    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg('userId', () => Int) userId: number
  ){
    await getConnection().getRepository(User).increment({id: userId}, 'tokenVersion', 1)

    return true
  }

}