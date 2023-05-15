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
        <div>TODO add nav with dynamic sign in / sign out button</div>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
