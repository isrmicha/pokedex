import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import NextAuthProvider from "./contet/NextAuthProvider";
import ThemeRegistry from "~/components/ThemeRegistry/ThemeRegistry";

export const metadata = {
  title: "Pokedex",
  description: "Created by isrmicha",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <NextAuthProvider>
            <ThemeRegistry>
              {children}
            </ThemeRegistry>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
