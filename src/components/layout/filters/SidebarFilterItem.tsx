import { Checkbox } from "@/components/ui/checkbox";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface SidebarFilterItemProps {
  label: string;
  isActive: boolean;
  onToggle: (checked: boolean) => void;
}

export function SidebarFilterItem({
  label,
  isActive,
  onToggle,
}: SidebarFilterItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <div>
          <Checkbox
            id={label}
            checked={isActive}
            onCheckedChange={(checked) => onToggle(!!checked)}
          />
          <label
            htmlFor={label}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
