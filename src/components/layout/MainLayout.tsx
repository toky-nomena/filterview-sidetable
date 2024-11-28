import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ChevronRight, ChevronLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { theme, setTheme } = useTheme();
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden bg-background">
			<Sidebar isCollapsed={isSidebarCollapsed} />
			<div className="flex flex-col flex-1">
				<div className="flex items-center justify-between p-4 border-b">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
					>
						{isSidebarCollapsed ? (
							<ChevronRight className="h-4 w-4" />
						) : (
							<ChevronLeft className="h-4 w-4" />
						)}
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
				<main className="flex-1 overflow-auto">
					<div className="container py-6">{children}</div>
				</main>
			</div>
		</div>
	);
};
