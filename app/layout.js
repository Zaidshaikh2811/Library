
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src: [
    { path: "./fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    {
      path: "./fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal"
    },
    {
      path: "./fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal"
    },
    {
      path: "./fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal"
    },
  ]
});

const bebbasNeue = localFont({
  src: [
    { path: "./fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue"
});

export const metadata = {
  title: "BookWise",
  description: " BookWise is a book Booking platform",
};

export default async function RootLayout({ children }) {
  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>

        <body
          className={`${ibmPlexSans.variable} ${bebbasNeue.variable} antialiased`}

        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
