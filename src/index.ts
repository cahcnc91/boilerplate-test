
import express from 'express';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { createSchema } from './utils/createSchema';
import "dotenv/config";
import {verify} from 'jsonwebtoken'
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './utils/auth';
import { sendRefreshToken } from './utils/sendRefreshToken';

(async () => {
  const app = express();

  await createConnection();

  const schema = await createSchema();

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }))

  app.use(cookieParser());

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid

    if(!token){
      return res.send({ok: false, acessToken: ''})
    }

    let payload: any = null;

    try{
      payload = verify(token, process.env.REFRESH_TOKEN!)

    } catch(err){
      console.log(err)
      return res.send({ok: false, acessToken: ''})
    }

    //token is valid
    const user = await User.findOne({id: payload.userId});

    if(!user){
      return res.send({ok: false, acessToken: ''})
    }

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({ok: true, acessToken: createAccessToken(user)})
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();
