import { t } from "./helpers/createRouter";
import { accountsRouter } from "./Account.router";
import { sessionsRouter } from "./Session.router";
import { usersRouter } from "./User.router";
import { verificationtokensRouter } from "./VerificationToken.router";
import { pokemonsRouter } from "./Pokemon.router";

export const appRouter = t.router({
  account: accountsRouter,
  session: sessionsRouter,
  user: usersRouter,
  verificationtoken: verificationtokensRouter,
  pokemon: pokemonsRouter,
})

export type AppRouter = typeof appRouter;
