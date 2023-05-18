import { t } from "./helpers/createRouter";
import { examplesRouter } from "./Example.router";
import { accountsRouter } from "./Account.router";
import { sessionsRouter } from "./Session.router";
import { usersRouter } from "./User.router";
import { verificationtokensRouter } from "./VerificationToken.router";
import { favoritesRouter } from "./Favorite.router";
import { pokemonsRouter } from "./Pokemon.router";

export const appRouter = t.router({
  example: examplesRouter,
  account: accountsRouter,
  session: sessionsRouter,
  user: usersRouter,
  verificationtoken: verificationtokensRouter,
  favorite: favoritesRouter,
  pokemon: pokemonsRouter,
})

export type AppRouter = typeof appRouter;
