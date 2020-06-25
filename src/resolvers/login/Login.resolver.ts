import { Resolver, Mutation, Arg, Ctx, Field, ObjectType } from "type-graphql";
import * as bcrypt from 'bcryptjs'
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContent';
import { createRefreshToken, createAccessToken } from '../../auth';

@ObjectType()
class LoginResponse {
  @Field()
  acessToken: string
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
      @Arg('email') email: string,
      @Arg('password') password: string,
      @Ctx() ctx: MyContext
  ): Promise<LoginResponse> {
      const user = await User.findOne({ where: {email}})

      if(!user){
          throw new Error('no user found')
      }

      const valid = await bcrypt.compare(password, user.password)

      if(!valid){
        throw new Error('password not valid')
      }

      if(!user.confirmed){
        throw new Error('user was not confirmed yet')
      }

      //login successull

      ctx.req.session!.userId = user.id;
      // ctx.res.cookie('jid', 
      // createRefreshToken(user), {httpOnly: true})

      return {
        acessToken: createAccessToken(user)
      }
  }

}