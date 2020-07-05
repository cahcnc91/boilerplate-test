import { Resolver, Ctx, Query } from "type-graphql";
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContent';
import { verify } from 'jsonwebtoken';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    console.log("here me resolver -------------------")
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const user = User.findOne(payload.userId);
      return user
    } catch (err) {
      console.log(err);
      return null;
    }
  }

}