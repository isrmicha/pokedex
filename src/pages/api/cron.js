import { ssgInit } from "../../server/ssg-init";

export default async function handler(req, res) {
  const helpers = await ssgInit();
  const hasSession = await helpers.session.findFirst.fetch({});
  res.status(200).json({ hasSession: !!hasSession });
}
