import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:opacity-90",
        ghost:
          "bg-transparent text-fg hover:bg-bg-subtle border border-transparent",
        outline:
          "bg-transparent text-fg border border-border hover:border-border-strong",
        subtle: "bg-bg-subtle text-fg hover:bg-bg-elevated",
      },
      size: {
        md: "h-11 px-4 rounded-md text-sm",
        sm: "h-9 px-3 rounded-sm text-sm",
        icon: "size-11 rounded-md",
        pill: "h-10 px-4 rounded-full text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
