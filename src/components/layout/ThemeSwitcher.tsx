import { ChevronsUpDown, LaptopMinimal, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useTheme } from "next-themes";

const themes = [
  {
    value: "light",
    name: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    name: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    name: "System",
    icon: LaptopMinimal,
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState(() =>
    themes.find((t) => t.value === theme)
  );

  return (
    <SidebarMenu className="border rounded-lg">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTheme.icon className="size-4" />
              </div>

              <span className="truncate font-semibold">{activeTheme.name}</span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Themes
            </DropdownMenuLabel>
            {themes.map((theme) => (
              <DropdownMenuItem
                key={theme.name}
                onClick={() => {
                  setActiveTheme(theme);
                  setTheme(theme.value);
                }}
                className={`gap-2 p-2 ${
                  theme.value === activeTheme.value
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : ""
                }`}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <theme.icon className="size-4 shrink-0" />
                </div>
                {theme.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
