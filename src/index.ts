
import express from 'express';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MovieResolver } from './resolvers/MovieResolver';
import { RegisterResolver } from './resolvers/RegisterResolver';
import session from 'express-session';
import connectRedis from 'connect-redis'
import { redis } from './redis';
import cors from 'cors';
import { LoginResolver } from './resolvers/LoginResolver';
import { MeResolver } from './resolvers/Me';
import { ConfirmUserResolver } from './resolvers/ConfirmUser';

(async () => {
  const app = express();

  await createConnection();

  const schema = await buildSchema({
    resolvers: [MovieResolver, RegisterResolver, LoginResolver, MeResolver, ConfirmUserResolver],
    authChecker: ({ context: { req } }) => {
      if(req.session.userId){
        return true; // or false if access is denied
      }
      return false
     
    }
  })

  const RedisStore = connectRedis(session);

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }))

  app.use(session({
    store: new RedisStore({
      client: (redis as any)
    }),
    name: "qid",
    secret: "asdfghjkl",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  }))


  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();
