import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { memo } from "react";

interface TooltipCellProps {
  label: React.ReactNode;
  tooltip: React.ReactNode;
}

function TooltipCellComponent({ label, tooltip }: TooltipCellProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-help">{label}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const TooltipCell = memo(TooltipCellComponent);
