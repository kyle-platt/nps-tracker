import "./globals.css";
import Header from "./header/header";

export const metadata = {
  title: "NPS Tracker",
  description:
    "Track your experiences at National Parks around the United States",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-tan">
        <Header />
        <main className="flex items-center flex-col h-full  px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
