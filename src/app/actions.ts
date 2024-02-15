'use server'

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server"
import { revalidateTag } from 'next/cache'


export async function updateUserFavorite(id: string) {
  const session = await getServerAuthSession();

  const favorites = session?.user.favorites
  const newFavorites = !!favorites
    ? favorites?.includes(id)
      ? favorites?.filter((pokemonId) => pokemonId !== id)
      : [...favorites, id]
    : [id];
  await api.usersRouter.updateOne.mutate({
    data: { favorites: newFavorites },
    where: { id: session?.user.id },
  })
  revalidateTag()
}