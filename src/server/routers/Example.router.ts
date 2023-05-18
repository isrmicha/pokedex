import { t, publicProcedure } from "./helpers/createRouter";
import { ExampleAggregateSchema } from "../schemas/aggregateExample.schema";
import { ExampleCreateManySchema } from "../schemas/createManyExample.schema";
import { ExampleCreateOneSchema } from "../schemas/createOneExample.schema";
import { ExampleDeleteManySchema } from "../schemas/deleteManyExample.schema";
import { ExampleDeleteOneSchema } from "../schemas/deleteOneExample.schema";
import { ExampleFindFirstSchema } from "../schemas/findFirstExample.schema";
import { ExampleFindManySchema } from "../schemas/findManyExample.schema";
import { ExampleFindUniqueSchema } from "../schemas/findUniqueExample.schema";
import { ExampleGroupBySchema } from "../schemas/groupByExample.schema";
import { ExampleUpdateManySchema } from "../schemas/updateManyExample.schema";
import { ExampleUpdateOneSchema } from "../schemas/updateOneExample.schema";
import { ExampleUpsertSchema } from "../schemas/upsertOneExample.schema";

export const examplesRouter = t.router({
  aggregate: publicProcedure
    .input(ExampleAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateExample = await ctx.prisma.example.aggregate(input);
      return aggregateExample;
    }),
  createMany: publicProcedure
    .input(ExampleCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyExample = await ctx.prisma.example.createMany(input);
      return createManyExample;
    }),
  createOne: publicProcedure
    .input(ExampleCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneExample = await ctx.prisma.example.create(input);
      return createOneExample;
    }),
  deleteMany: publicProcedure
    .input(ExampleDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyExample = await ctx.prisma.example.deleteMany(input);
      return deleteManyExample;
    }),
  deleteOne: publicProcedure
    .input(ExampleDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneExample = await ctx.prisma.example.delete(input);
      return deleteOneExample;
    }),
  findFirst: publicProcedure
    .input(ExampleFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstExample = await ctx.prisma.example.findFirst(input);
      return findFirstExample;
    }),
  findFirstOrThrow: publicProcedure
    .input(ExampleFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstExampleOrThrow = await ctx.prisma.example.findFirstOrThrow(input);
      return findFirstExampleOrThrow;
    }),
  findMany: publicProcedure
    .input(ExampleFindManySchema).query(async ({ ctx, input }) => {
      const findManyExample = await ctx.prisma.example.findMany(input);
      return findManyExample;
    }),
  findUnique: publicProcedure
    .input(ExampleFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueExample = await ctx.prisma.example.findUnique(input);
      return findUniqueExample;
    }),
  findUniqueOrThrow: publicProcedure
    .input(ExampleFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueExampleOrThrow = await ctx.prisma.example.findUniqueOrThrow(input);
      return findUniqueExampleOrThrow;
    }),
  groupBy: publicProcedure
    .input(ExampleGroupBySchema).query(async ({ ctx, input }) => {
      const groupByExample = await ctx.prisma.example.groupBy({ where: input.where, orderBy: input.orderBy, by: input.by, having: input.having, take: input.take, skip: input.skip });
      return groupByExample;
    }),
  updateMany: publicProcedure
    .input(ExampleUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyExample = await ctx.prisma.example.updateMany(input);
      return updateManyExample;
    }),
  updateOne: publicProcedure
    .input(ExampleUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneExample = await ctx.prisma.example.update(input);
      return updateOneExample;
    }),
  upsertOne: publicProcedure
    .input(ExampleUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneExample = await ctx.prisma.example.upsert(input);
      return upsertOneExample;
    }),

}) 
