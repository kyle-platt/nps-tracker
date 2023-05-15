import SupabaseProvider from "./supabase-provider";

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
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
