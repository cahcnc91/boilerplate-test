import { ResolverMap } from "./types/graphql-utils";
import GQL from "./types/schema";
import { User } from "./entity/User";
var bcrypt = require("bcryptjs");
import { getRepository } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `By ${name || "World"}`,
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = getRepository(User).create({
        email,
        password: hashedPassword,
      });

      await getRepository(User).save(user);
      return true;
    },
  },
};
