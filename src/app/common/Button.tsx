import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  className,
  ...rest
}: Props) => (
  <button
    {...rest}
    className={
      variant === "primary"
        ? `bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full h-fit ${className}`
        : `border-gray-800 border-solid border-2 bg-white text-gray-800 hover:bg-gray-800 hover:text-white font-bold py-2 px-4 rounded-full h-fit ${className}`
    }
  >
    {children}
  </button>
);

export default Button;
