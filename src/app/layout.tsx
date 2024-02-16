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



export default function RootLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <AppRouterCacheProvider
          options={{ key: 'css' }}
        >
          <ThemeProvider theme={darkTheme}>
            <TRPCReactProvider>
              <NextAuthProvider>
                {props.children}
              </NextAuthProvider>
            </TRPCReactProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
