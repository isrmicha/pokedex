import "~/styles/globals.css";

import { ThemeProvider } from '@mui/material/styles';
import { TRPCReactProvider } from "~/trpc/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { darkTheme } from "~/theme";
import NextAuthProvider from "./contet/NextAuthProvider";

export const metadata = {
  title: "Pokedex",
  description: "Created by isrmicha",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body >
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <TRPCReactProvider>
              <NextAuthProvider>
                {children}
              </NextAuthProvider>
            </TRPCReactProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
