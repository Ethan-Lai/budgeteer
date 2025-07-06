import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export function AppLayout() {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto p-5">
                    <SidebarTrigger />
                    {/* Outlet renders the current route we're on */}
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}