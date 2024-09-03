import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import NextAuthProvider from "./contet/NextAuthProvider";
import ThemeRegistry from "~/components/ThemeRegistry/ThemeRegistry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="google-adsense-account"
        content="ca-pub-1206374572085912"
      ></meta>
      <body>
        <TRPCReactProvider>
          <NextAuthProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
