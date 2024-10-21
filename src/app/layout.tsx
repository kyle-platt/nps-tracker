import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
