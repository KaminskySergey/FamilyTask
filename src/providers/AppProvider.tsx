import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../contexts/AuthContext";
import { queryClient } from "../lib/queryClient";
import SidebarProvider from "../contexts/SibebarContext";


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}