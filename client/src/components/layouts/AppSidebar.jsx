import { Calendar, Home, LogOut, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import PlanForm from "../plans/CreatePlanModal"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: Home,
  },
  {
    title: "Plans",
    url: "/app/plans",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        navigate('/')
    }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <div className="flex flex-col h-full justify-between">
                    <SidebarMenuItem>
                        <PlanForm />
                    </SidebarMenuItem>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link to={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                                </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Button onClick={handleLogout}>
                                <LogOut />
                                <span>Logout</span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}