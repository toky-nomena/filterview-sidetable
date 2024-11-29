import { Checkbox } from "@/components/ui/checkbox";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface SidebarFilterItemProps {
  item: string;
  isActive: boolean;
  onToggle: (checked: boolean) => void;
}

export function SidebarFilterItem({
  item,
  isActive,
  onToggle,
}: SidebarFilterItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <div>
          <Checkbox
            id={item}
            checked={isActive}
            onCheckedChange={(checked) => onToggle(!!checked)}
          />
          <label
            htmlFor={item}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item}
          </label>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
