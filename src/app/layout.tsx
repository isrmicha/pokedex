import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles';
import { TRPCReactProvider } from "~/trpc/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { darkTheme } from "~/theme";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <AppRouterCacheProvider 
           options={{ key: 'css' }}
          >
            <ThemeProvider theme={darkTheme}>
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
