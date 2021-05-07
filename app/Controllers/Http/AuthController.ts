import Auth from "App/Models/Auth";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  schema,
  rules, // 👈 import validator
} from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async register(ctx) {
    const email = ctx.request.input("email");
    const password = ctx.request.input("password");
    try {
      const internsSchema = schema.create({
        email: schema.string({}, [rules.email(), rules.required]),
        password: schema.string({}, [
          rules.minLength(6),
          rules.maxLength(16),
          rules.required,
        ]),
      });

      await ctx.request.validate({ schema: internsSchema });
      const user = new Auth();
      user.email = email;
      user.password = password;
      await user.save();
    } catch (error) {
      ctx.response.badRequest(error.messages);
    }
  }

  public async login(ctx) {
    const email = ctx.request.input("email");
    const password = ctx.request.input("password");
    const user = await Auth.query().where("email", email).firstOrFail();
    if (!(await Hash.verify(user.password, password))) {
      return ctx.response.badRequest("Invalid credentials");
    }
    const token = await ctx.auth.use("api").attempt(email, password, {
      expiresIn: "2days",
    });
    return token.toJSON();
  }
  public async logout(ctx) {
    await ctx.auth.use("api").revoke();
    return {
      revoked: true,
    };
  }
}
