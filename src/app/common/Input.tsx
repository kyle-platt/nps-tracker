import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...rest }: Props) => (
  <input
    {...rest}
    className={`bg-white text-gray-800 py-2 px-4 rounded-full h-fit ${className}`}
  />
);

export default Input;
