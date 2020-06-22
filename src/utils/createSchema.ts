import { buildSchema } from "type-graphql";
import { RegisterResolver } from "../resolvers/register/Register.resolver";
import { ConfirmUserResolver } from "../resolvers/confirm-user/ConfirmUser.resolver";
import { ChangePasswordResolver } from "../resolvers/change-password/ChangePassword.resolver";
import { ForgotPasswordResolver } from "../resolvers/forgot-password/ForgotPassword.resolver";
import { LoginResolver } from "../resolvers/login/Login.resolver";
import { MeResolver } from '../resolvers/me/Me.resolver';

export const createSchema = () => {
  return buildSchema({
    resolvers: [
      RegisterResolver,
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      MeResolver
    ],
    authChecker: ({ context: { req } }) => {
      if (req.session.userId) {
        return true; // or false if access is denied
      }
      return false;
    },
  });
};
