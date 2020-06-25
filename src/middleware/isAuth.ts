import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContent";
import { verify } from "jsonwebtoken";

//bearer 234234r234234
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {

  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
  }
  return next();
};
