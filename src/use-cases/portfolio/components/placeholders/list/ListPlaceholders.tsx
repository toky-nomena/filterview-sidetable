import { useId } from "react";
import { PortfolioListItemPlaceholder } from "../item/PortfolioListItemPlaceholder";

export function ListPlaceholders() {
  const id = useId();
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <PortfolioListItemPlaceholder key={`${id}list-${String(index)}`} />
      ))}
    </div>
  );
}
