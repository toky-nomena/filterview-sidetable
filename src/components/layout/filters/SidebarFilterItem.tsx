import { Checkbox } from "@/components/ui/checkbox";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { motion } from "motion/react";

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
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
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
        </motion.div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
