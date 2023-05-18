import { t, publicProcedure } from "./helpers/createRouter";
import { SessionAggregateSchema } from "../schemas/aggregateSession.schema";
import { SessionCreateManySchema } from "../schemas/createManySession.schema";
import { SessionCreateOneSchema } from "../schemas/createOneSession.schema";
import { SessionDeleteManySchema } from "../schemas/deleteManySession.schema";
import { SessionDeleteOneSchema } from "../schemas/deleteOneSession.schema";
import { SessionFindFirstSchema } from "../schemas/findFirstSession.schema";
import { SessionFindManySchema } from "../schemas/findManySession.schema";
import { SessionFindUniqueSchema } from "../schemas/findUniqueSession.schema";
import { SessionGroupBySchema } from "../schemas/groupBySession.schema";
import { SessionUpdateManySchema } from "../schemas/updateManySession.schema";
import { SessionUpdateOneSchema } from "../schemas/updateOneSession.schema";
import { SessionUpsertSchema } from "../schemas/upsertOneSession.schema";

export const sessionsRouter = t.router({
  aggregate: publicProcedure
    .input(SessionAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateSession = await ctx.prisma.session.aggregate(input);
      return aggregateSession;
    }),
  createMany: publicProcedure
    .input(SessionCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManySession = await ctx.prisma.session.createMany(input);
      return createManySession;
    }),
  createOne: publicProcedure
    .input(SessionCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneSession = await ctx.prisma.session.create(input);
      return createOneSession;
    }),
  deleteMany: publicProcedure
    .input(SessionDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManySession = await ctx.prisma.session.deleteMany(input);
      return deleteManySession;
    }),
  deleteOne: publicProcedure
    .input(SessionDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneSession = await ctx.prisma.session.delete(input);
      return deleteOneSession;
    }),
  findFirst: publicProcedure
    .input(SessionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstSession = await ctx.prisma.session.findFirst(input);
      return findFirstSession;
    }),
  findFirstOrThrow: publicProcedure
    .input(SessionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstSessionOrThrow = await ctx.prisma.session.findFirstOrThrow(input);
      return findFirstSessionOrThrow;
    }),
  findMany: publicProcedure
    .input(SessionFindManySchema).query(async ({ ctx, input }) => {
      const findManySession = await ctx.prisma.session.findMany(input);
      return findManySession;
    }),
  findUnique: publicProcedure
    .input(SessionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueSession = await ctx.prisma.session.findUnique(input);
      return findUniqueSession;
    }),
  findUniqueOrThrow: publicProcedure
    .input(SessionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueSessionOrThrow = await ctx.prisma.session.findUniqueOrThrow(input);
      return findUniqueSessionOrThrow;
    }),
  groupBy: publicProcedure
    .input(SessionGroupBySchema).query(async ({ ctx, input }) => {
      const groupBySession = await ctx.prisma.session.groupBy({ where: input.where, orderBy: input.orderBy, by: input.by, having: input.having, take: input.take, skip: input.skip });
      return groupBySession;
    }),
  updateMany: publicProcedure
    .input(SessionUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManySession = await ctx.prisma.session.updateMany(input);
      return updateManySession;
    }),
  updateOne: publicProcedure
    .input(SessionUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneSession = await ctx.prisma.session.update(input);
      return updateOneSession;
    }),
  upsertOne: publicProcedure
    .input(SessionUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneSession = await ctx.prisma.session.upsert(input);
      return upsertOneSession;
    }),

}) 
