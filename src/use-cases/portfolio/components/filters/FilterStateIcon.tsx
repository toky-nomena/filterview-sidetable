import { Circle, CircleCheck, Loader2 } from "lucide-react";

export interface FilterStateIconProps {
  isLoading?: boolean;
  isSelected?: boolean;
}

export function FilterStateIcon({
  isLoading,
  isSelected,
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
