import Image from "next/image";
import SupabaseProvider from "./supabase-provider";
import Link from "next/link";
import Header from "./header/header";

export const metadata = {
  title: "NPS Tracker",
  description:
    "Track your experiences at National Parks around the United States",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          {/* @ts-expect-error Server Component */}
          <Header />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
