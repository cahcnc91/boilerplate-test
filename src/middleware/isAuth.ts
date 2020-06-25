import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContent";

//bearer 234234r234234
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not authenticated");
  }

  // const authorization = context.req.headers["authorization"];

  // if (!authorization) {
  //   throw new Error("not authenticated");
  // }

  // try {
  //   const token = authorization.split(" ")[1];
  //   const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
  //   context.payload = payload as any;
  // } catch (err) {
  //   console.log(err);
  // }
  return next();
};
