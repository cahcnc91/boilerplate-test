import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from '../../types/MyContent';
import { sendRefreshToken } from '../../utils/sendRefreshToken';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(
      @Ctx() {res}: MyContext
  ): Promise<Boolean> {
    sendRefreshToken(res, "");

    return true;
  }
}