import NextLink, { LinkProps } from "next/link";

interface Props extends LinkProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const Link = ({
  children,
  variant = "primary",
  href,
  className,
  ...rest
}: Props) => (
  <NextLink
    href={href}
    {...rest}
    className={
      variant === "primary"
        ? `bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full h-fit ${className}`
        : `border-gray-800 border-solid border-2 bg-white text-gray-800 hover:bg-gray-800 hover:text-white font-bold py-2 px-4 rounded-full h-fit ${className}`
    }
  >
    {children}
  </NextLink>
);

export default Link;
