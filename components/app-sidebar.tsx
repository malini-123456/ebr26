"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Calendar,
  Book,
  QrCode
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSatu } from "./nav-satu"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "E-certificate",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "E-Signature",
          url: "/admin",
        },
        {
          title: "No-Signature",
          url: "#",
        },
        {
          title: "Input Subkon",
          url: "#",
        },
      ],
    },
    {
      title: "Database",
      icon: Bot,
      items: [
        {
          title:"Database Alat",
          url:"#"
        }
      ]
    }
  ],
  satu: [
    {
      title: "Projects",
      url: "#",
      icon: Frame,
    },
    {
      title: "Events",
      url: "#",
      icon: Calendar,
    },

    {
      title: "Buku Induk",
      url: "#",
      icon: Book,
    },
    
    {
      title: "Cetak Stiker",
      url: "#",
      icon: QrCode,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavSatu items={data.satu} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
