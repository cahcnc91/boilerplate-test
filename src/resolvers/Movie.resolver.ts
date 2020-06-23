import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field,
  Ctx,
} from "type-graphql";
import { Movie } from "../entity/Movie";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContent";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(
    @Arg("options", () => MovieInput) options: MovieInput,
    @Ctx() ctx: MyContext
  ) {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    const user = await User.findOne(ctx.req.session!.userId);

    if(!user){
      return null
    }
    console.log(user)
    const movie = await Movie.create({...options, ownerId: user.id}).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    await Movie.delete({ id });
    return true;
  }

  @Query(() => [Movie])
  async movies() {
    const movies = Movie.find({ relations: ["owner"]});
    return movies
  }
}
