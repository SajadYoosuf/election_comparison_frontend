import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "./Card";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "white";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 font-label-sm text-[12px] font-bold tracking-[0.05em] rounded transition-all",
          variant === "primary" && "bg-[#4ae176] text-black hover:opacity-90",
          variant === "white" && "bg-white text-black hover:bg-gray-100",
          variant === "secondary" && "border border-white/20 text-white hover:bg-white/5",
          variant === "ghost" && "text-[#8B949E] hover:text-white",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
