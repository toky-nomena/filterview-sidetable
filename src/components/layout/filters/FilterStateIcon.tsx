import { Circle, CircleCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterStateIconProps {
  isLoading?: boolean;
  isSelected?: boolean;
  className?: string;
}

export function FilterStateIcon({
  isLoading,
  isSelected,
  className,
}: FilterStateIconProps) {
  if (isLoading) {
    return (
      <Loader2 className="size-8 stroke-[2] text-muted-foreground animate-spin" />
    );
  }

  if (isSelected) {
    return <CircleCheck className="size-8 stroke-[2] text-primary" />;
  }

  return (
    <Circle className="size-8 stroke-[2] text-muted-foreground hover:text-foreground" />
  );
}
