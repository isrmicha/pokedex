import { t, publicProcedure } from "./helpers/createRouter";
import { UserAggregateSchema } from "../schemas/aggregateUser.schema";
import { UserCreateManySchema } from "../schemas/createManyUser.schema";
import { UserCreateOneSchema } from "../schemas/createOneUser.schema";
import { UserDeleteManySchema } from "../schemas/deleteManyUser.schema";
import { UserDeleteOneSchema } from "../schemas/deleteOneUser.schema";
import { UserFindFirstSchema } from "../schemas/findFirstUser.schema";
import { UserFindManySchema } from "../schemas/findManyUser.schema";
import { UserFindUniqueSchema } from "../schemas/findUniqueUser.schema";
import { UserGroupBySchema } from "../schemas/groupByUser.schema";
import { UserUpdateManySchema } from "../schemas/updateManyUser.schema";
import { UserUpdateOneSchema } from "../schemas/updateOneUser.schema";
import { UserUpsertSchema } from "../schemas/upsertOneUser.schema";

export const usersRouter = t.router({
  aggregate: publicProcedure
    .input(UserAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateUser = await ctx.prisma.user.aggregate(input);
      return aggregateUser;
    }),
  createMany: publicProcedure
    .input(UserCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyUser = await ctx.prisma.user.createMany(input);
      return createManyUser;
    }),
  createOne: publicProcedure
    .input(UserCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneUser = await ctx.prisma.user.create(input);
      return createOneUser;
    }),
  deleteMany: publicProcedure
    .input(UserDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyUser = await ctx.prisma.user.deleteMany(input);
      return deleteManyUser;
    }),
  deleteOne: publicProcedure
    .input(UserDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneUser = await ctx.prisma.user.delete(input);
      return deleteOneUser;
    }),
  findFirst: publicProcedure
    .input(UserFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstUser = await ctx.prisma.user.findFirst(input);
      return findFirstUser;
    }),
  findFirstOrThrow: publicProcedure
    .input(UserFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstUserOrThrow = await ctx.prisma.user.findFirstOrThrow(input);
      return findFirstUserOrThrow;
    }),
  findMany: publicProcedure
    .input(UserFindManySchema).query(async ({ ctx, input }) => {
      const findManyUser = await ctx.prisma.user.findMany(input);
      return findManyUser;
    }),
  findUnique: publicProcedure
    .input(UserFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueUser = await ctx.prisma.user.findUnique(input);
      return findUniqueUser;
    }),
  findUniqueOrThrow: publicProcedure
    .input(UserFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueUserOrThrow = await ctx.prisma.user.findUniqueOrThrow(input);
      return findUniqueUserOrThrow;
    }),
  groupBy: publicProcedure
    .input(UserGroupBySchema).query(async ({ ctx, input }) => {
      const groupByUser = await ctx.prisma.user.groupBy({ where: input.where, orderBy: input.orderBy, by: input.by, having: input.having, take: input.take, skip: input.skip });
      return groupByUser;
    }),
  updateMany: publicProcedure
    .input(UserUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyUser = await ctx.prisma.user.updateMany(input);
      return updateManyUser;
    }),
  updateOne: publicProcedure
    .input(UserUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneUser = await ctx.prisma.user.update(input);
      return updateOneUser;
    }),
  upsertOne: publicProcedure
    .input(UserUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneUser = await ctx.prisma.user.upsert(input);
      return upsertOneUser;
    }),

}) 
