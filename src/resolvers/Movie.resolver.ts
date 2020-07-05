
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
import { User } from '../entity/User';

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
  ):Promise<Movie> {

    const ownerId = ctx.payload?.userId;

    let movie =  await Movie.create({...options, ownerId}).save();
    const owner = await User.findOne({where: {id: movie.ownerId}});

    if(owner){
      movie.owner = owner;
    }
    
    return movie
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

  @UseMiddleware(isAuth)
  @Query(() => [Movie])
  async movies() {
    const movies = Movie.find({ relations: ["owner"]});
    return movies
  }
}
