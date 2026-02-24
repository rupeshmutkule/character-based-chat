"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { twMerge } from "tailwind-merge"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center active:scale-[0.98] justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-neutral-700/50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: " bg-white disabled:bg-white/30"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children?: React.ReactNode,
  isloading?: boolean
  isDisabled?: boolean
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, isDisabled, isloading, ...props }, ref) => {
    return (
      <button ref={ref} {...props} disabled={isDisabled || isloading} className={cn("relative", (isloading || isDisabled) && " bg-white/50", buttonVariants({ variant, size, className }))}>
        {
          isloading && <div className=" absolute w-full h-full flex justify-center items-center"><Loader2 className=" animate-spin text-white" /> </div>
        }
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
