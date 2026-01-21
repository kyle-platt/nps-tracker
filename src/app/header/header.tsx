import Image from "next/image";
import NextLink from "next/link";
import HeaderNav from "./headerNav";

export default function Header() {
  return (
    <header className="flex justify-between p-4 w-full">
      <NextLink href="/" className="flex items-center text-gray-800 font-bold">
        <Image
          src="/nps.svg"
          width={36}
          height={36}
          alt="NPS Logo"
          className="mr-2"
          priority
        />
        Tracker
      </NextLink>
      <HeaderNav />
    </header>
  );
}
