import Route from "@ioc:Adonis/Core/Route";

import HealthCheck from "@ioc:Adonis/Core/HealthCheck";


Route.resource("interns", "InternsController").apiOnly();

Route.get("/cohort", async (ctx) => {
  const { default: CohortsController } = await import(
    "App/Controllers/Http/CohortsController"
  );
  return new CohortsController().findByYear(ctx);
});

Route.post("register", async (ctx) => {
  const { default: AuthController } = await import(
    "App/Controllers/Http/AuthController"
  );
  return new AuthController().register(ctx);
});

Route.post("login", async (ctx) => {
    const { default: AuthController } = await import(
      "App/Controllers/Http/AuthController"
    );
    return new AuthController().login(ctx);
});


Route.post("/logout", async (ctx) => {
  const { default: AuthController } = await import(
    "App/Controllers/Http/AuthController"
  );
  return new AuthController().logout(ctx);
});

Route.get("health", async ({ response }) => {
  const report = await HealthCheck.getReport();

  return report.healthy ? response.ok(report) : response.badRequest(report);
});
