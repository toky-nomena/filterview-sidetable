import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Index } from "./pages/Index";
import { preloadLookups } from "./use-cases/lookup/lookup.service";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

preloadLookups();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="top-right"
          />
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Index />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>{" "}
      </NuqsAdapter>
    </ThemeProvider>
  );
}

export default App;
