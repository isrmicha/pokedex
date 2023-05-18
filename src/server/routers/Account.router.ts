import { t, publicProcedure } from "./helpers/createRouter";
import { AccountAggregateSchema } from "../schemas/aggregateAccount.schema";
import { AccountCreateManySchema } from "../schemas/createManyAccount.schema";
import { AccountCreateOneSchema } from "../schemas/createOneAccount.schema";
import { AccountDeleteManySchema } from "../schemas/deleteManyAccount.schema";
import { AccountDeleteOneSchema } from "../schemas/deleteOneAccount.schema";
import { AccountFindFirstSchema } from "../schemas/findFirstAccount.schema";
import { AccountFindManySchema } from "../schemas/findManyAccount.schema";
import { AccountFindUniqueSchema } from "../schemas/findUniqueAccount.schema";
import { AccountGroupBySchema } from "../schemas/groupByAccount.schema";
import { AccountUpdateManySchema } from "../schemas/updateManyAccount.schema";
import { AccountUpdateOneSchema } from "../schemas/updateOneAccount.schema";
import { AccountUpsertSchema } from "../schemas/upsertOneAccount.schema";

export const accountsRouter = t.router({
  aggregate: publicProcedure
    .input(AccountAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateAccount = await ctx.prisma.account.aggregate(input);
      return aggregateAccount;
    }),
  createMany: publicProcedure
    .input(AccountCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyAccount = await ctx.prisma.account.createMany(input);
      return createManyAccount;
    }),
  createOne: publicProcedure
    .input(AccountCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneAccount = await ctx.prisma.account.create(input);
      return createOneAccount;
    }),
  deleteMany: publicProcedure
    .input(AccountDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyAccount = await ctx.prisma.account.deleteMany(input);
      return deleteManyAccount;
    }),
  deleteOne: publicProcedure
    .input(AccountDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneAccount = await ctx.prisma.account.delete(input);
      return deleteOneAccount;
    }),
  findFirst: publicProcedure
    .input(AccountFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstAccount = await ctx.prisma.account.findFirst(input);
      return findFirstAccount;
    }),
  findFirstOrThrow: publicProcedure
    .input(AccountFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstAccountOrThrow = await ctx.prisma.account.findFirstOrThrow(input);
      return findFirstAccountOrThrow;
    }),
  findMany: publicProcedure
    .input(AccountFindManySchema).query(async ({ ctx, input }) => {
      const findManyAccount = await ctx.prisma.account.findMany(input);
      return findManyAccount;
    }),
  findUnique: publicProcedure
    .input(AccountFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueAccount = await ctx.prisma.account.findUnique(input);
      return findUniqueAccount;
    }),
  findUniqueOrThrow: publicProcedure
    .input(AccountFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueAccountOrThrow = await ctx.prisma.account.findUniqueOrThrow(input);
      return findUniqueAccountOrThrow;
    }),
  groupBy: publicProcedure
    .input(AccountGroupBySchema).query(async ({ ctx, input }) => {
      const groupByAccount = await ctx.prisma.account.groupBy({ where: input.where, orderBy: input.orderBy, by: input.by, having: input.having, take: input.take, skip: input.skip });
      return groupByAccount;
    }),
  updateMany: publicProcedure
    .input(AccountUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyAccount = await ctx.prisma.account.updateMany(input);
      return updateManyAccount;
    }),
  updateOne: publicProcedure
    .input(AccountUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneAccount = await ctx.prisma.account.update(input);
      return updateOneAccount;
    }),
  upsertOne: publicProcedure
    .input(AccountUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneAccount = await ctx.prisma.account.upsert(input);
      return upsertOneAccount;
    }),

}) 
