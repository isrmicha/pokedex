import { t, publicProcedure } from "./helpers/createRouter";
import { FavoriteAggregateSchema } from "../schemas/aggregateFavorite.schema";
import { FavoriteCreateManySchema } from "../schemas/createManyFavorite.schema";
import { FavoriteCreateOneSchema } from "../schemas/createOneFavorite.schema";
import { FavoriteDeleteManySchema } from "../schemas/deleteManyFavorite.schema";
import { FavoriteDeleteOneSchema } from "../schemas/deleteOneFavorite.schema";
import { FavoriteFindFirstSchema } from "../schemas/findFirstFavorite.schema";
import { FavoriteFindManySchema } from "../schemas/findManyFavorite.schema";
import { FavoriteFindUniqueSchema } from "../schemas/findUniqueFavorite.schema";
import { FavoriteGroupBySchema } from "../schemas/groupByFavorite.schema";
import { FavoriteUpdateManySchema } from "../schemas/updateManyFavorite.schema";
import { FavoriteUpdateOneSchema } from "../schemas/updateOneFavorite.schema";
import { FavoriteUpsertSchema } from "../schemas/upsertOneFavorite.schema";

export const favoritesRouter = t.router({
  aggregate: publicProcedure
    .input(FavoriteAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateFavorite = await ctx.prisma.favorite.aggregate(input);
      return aggregateFavorite;
    }),
  createMany: publicProcedure
    .input(FavoriteCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyFavorite = await ctx.prisma.favorite.createMany(input);
      return createManyFavorite;
    }),
  createOne: publicProcedure
    .input(FavoriteCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneFavorite = await ctx.prisma.favorite.create(input);
      return createOneFavorite;
    }),
  deleteMany: publicProcedure
    .input(FavoriteDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyFavorite = await ctx.prisma.favorite.deleteMany(input);
      return deleteManyFavorite;
    }),
  deleteOne: publicProcedure
    .input(FavoriteDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneFavorite = await ctx.prisma.favorite.delete(input);
      return deleteOneFavorite;
    }),
  findFirst: publicProcedure
    .input(FavoriteFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstFavorite = await ctx.prisma.favorite.findFirst(input);
      return findFirstFavorite;
    }),
  findFirstOrThrow: publicProcedure
    .input(FavoriteFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstFavoriteOrThrow = await ctx.prisma.favorite.findFirstOrThrow(input);
      return findFirstFavoriteOrThrow;
    }),
  findMany: publicProcedure
    .input(FavoriteFindManySchema).query(async ({ ctx, input }) => {
      const findManyFavorite = await ctx.prisma.favorite.findMany(input);
      return findManyFavorite;
    }),
  findUnique: publicProcedure
    .input(FavoriteFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueFavorite = await ctx.prisma.favorite.findUnique(input);
      return findUniqueFavorite;
    }),
  findUniqueOrThrow: publicProcedure
    .input(FavoriteFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueFavoriteOrThrow = await ctx.prisma.favorite.findUniqueOrThrow(input);
      return findUniqueFavoriteOrThrow;
    }),
  groupBy: publicProcedure
    .input(FavoriteGroupBySchema).query(async ({ ctx, input }) => {
      const groupByFavorite = await ctx.prisma.favorite.groupBy({ where: input.where, orderBy: input.orderBy, by: input.by, having: input.having, take: input.take, skip: input.skip });
      return groupByFavorite;
    }),
  updateMany: publicProcedure
    .input(FavoriteUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyFavorite = await ctx.prisma.favorite.updateMany(input);
      return updateManyFavorite;
    }),
  updateOne: publicProcedure
    .input(FavoriteUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneFavorite = await ctx.prisma.favorite.update(input);
      return updateOneFavorite;
    }),
  upsertOne: publicProcedure
    .input(FavoriteUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneFavorite = await ctx.prisma.favorite.upsert(input);
      return upsertOneFavorite;
    }),

}) 
