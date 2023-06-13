import { trpc } from "../../../src/utils/trpc";

export default async function handler(req, res) {
  const hasSession = await trpc.session.findMany();
  res.status(200).end("Hello Cron! " + !!hasSession);
}
