import {
  Frame,
  SquareTerminal,
  LogOut,
  UserPlus,
  File,
  User,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Reports",
      url: "#",
      icon: SquareTerminal,
      // isActive: true,
      items: [
        {
          title: "Today",
          url: "#",
        },
        {
          title: "Weekly",
          url: "#",
        },
        {
          title: "Monthly",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Add New Client",
      url: "./add-new-client",
      icon: UserPlus,
    },
    {
      name: "Reports",
      url: "./reports",
      icon: File,
    },
    {
      name: "Users",
      url: "./users-table",
      icon: User,
    },
    {
      name: "Logout",
      url: "./logout",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavProjects projects={data.projects} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
