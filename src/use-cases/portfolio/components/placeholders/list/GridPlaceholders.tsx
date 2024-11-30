import { useId } from "react";
import { PortfolioGridItemPlaceholder } from "../item/PortfolioGridItemPlaceholder";

export function GridPlaceholders() {
  const id = useId();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <PortfolioGridItemPlaceholder key={`${id}grid-${String(index)}`} />
      ))}
    </div>
  );
}
