import { type AppType, } from "next/app"
import { type Session, } from "next-auth"
import { SessionProvider, } from "next-auth/react"
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { api, getBaseUrl, } from "~/utils/api"
import { trpc, } from "~/utils/trpc"
import "~/styles/globals.css"
import { httpBatchLink, } from "@trpc/client"
import { useState, } from "react"
import SuperJSON from "superjson"



const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [queryClient,] = useState<QueryClient>(() => new QueryClient())
  const [trpcClient,] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: SuperJSON,
    }),
  )
  return (
    <SessionProvider session={session}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
