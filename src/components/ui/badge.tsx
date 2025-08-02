import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-architect-gray-300/50 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-architect-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-architect-primary text-white hover:bg-architect-primary/80",
        secondary:
          "border-transparent bg-architect-gray-200 text-architect-gray-900 hover:bg-architect-gray-200/80",
        destructive:
          "border-transparent bg-architect-error text-white hover:bg-architect-error/80",
        outline: "text-architect-gray-900",
        purple: "border-transparent bg-architect-accent text-white hover:bg-architect-accent/80",
        success: "border-transparent bg-architect-success text-white hover:bg-architect-success/80",
        warning: "border-transparent bg-architect-warning text-white hover:bg-architect-warning/80",
        info: "border-transparent bg-architect-info text-white hover:bg-architect-info/80"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }