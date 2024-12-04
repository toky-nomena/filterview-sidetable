import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid2X2, Rows3, Table2 } from "lucide-react";

interface PortfolioViewChangerProps {
  viewMode: string;
  setViewMode: (mode: "table" | "grid" | "list") => void;
  disabled?: boolean;
}

export function PortfolioViewChanger({
  viewMode,
  setViewMode,
  disabled = false,
}: PortfolioViewChangerProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setViewMode("table")}
        disabled={disabled}
        className={cn(
          "transition-colors",
          viewMode === "table" && "bg-accent/50 hover:bg-accent/70",
        )}
      >
        <Table2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setViewMode("grid")}
        disabled={disabled}
        className={cn(
          "transition-colors",
          viewMode === "grid" && "bg-accent/50 hover:bg-accent/70",
        )}
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setViewMode("list")}
        disabled={disabled}
        className={cn(
          "transition-colors",
          viewMode === "list" && "bg-accent/50 hover:bg-accent/70",
        )}
      >
        <Rows3 className="h-4 w-4" />
      </Button>
    </div>
  );
}
