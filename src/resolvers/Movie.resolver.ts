
import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Movie } from "../entity/Movie";
import { MyContext } from "../types/MyContent";
import { isAuth } from '../middleware/isAuth';

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
  @UseMiddleware(isAuth)
  @Mutation(() => Movie)
  async createMovie(
    @Arg("options", () => MovieInput) options: MovieInput,
    @Ctx() ctx: MyContext
  ) {

    console.log("here")
    console.log(options)
    console.log(ctx.req.session)

    const ownerId = ctx.req.session!.userId;

    const movie = await Movie.create({...options, ownerId}).save();
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
