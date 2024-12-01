import { Circle, CircleCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterStateIcon } from "./FilterStateIcon";

export interface SidebarFilterHeaderProps {
  title: string;
  activeItemsCount: number;
  allSelected: boolean;
  isLoading?: boolean;
  onToggleAll: () => void;
  onClear: () => void;
}

export function SidebarFilterHeader({
  title,
  activeItemsCount,
  allSelected,
  isLoading,
  onToggleAll,
  onClear,
}: SidebarFilterHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleAll();
        }}
        disabled={isLoading}
        className={cn(
          "flex size-6 items-center justify-center rounded-full transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
        aria-label={allSelected ? "Deselect all filters" : "Select all filters"}
      >
        <FilterStateIcon isLoading={isLoading} isSelected={allSelected} />
      </button>
      <span className="flex items-center gap-2">
        <span className="font-medium">{title}</span>
        {activeItemsCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">
              ({activeItemsCount})
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              disabled={isLoading}
              className={cn(
                "text-xs text-muted-foreground hover:text-destructive transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-muted-foreground",
              )}
              aria-label="Clear selected filters"
            >
              Clear
            </button>
          </div>
        )}
      </span>
    </div>
  );
}
