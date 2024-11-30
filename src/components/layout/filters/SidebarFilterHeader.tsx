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
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggleAll();
        }}
        className={cn(
          "flex size-6 items-center justify-center rounded-full transition-colors",
        )}
      >
        <FilterStateIcon isLoading={isLoading} isSelected={allSelected} />
      </div>
      <span className="flex items-center">
        {title}
        {activeItemsCount > 0 && (
          <>
            <span className="ml-2 text-xs text-muted-foreground font-bold">
              ({activeItemsCount})
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="ml-2 text-xs text-muted-foreground font-normal hover:text-destructive"
            >
              Clear
            </button>
          </>
        )}
      </span>
    </div>
  );
}
