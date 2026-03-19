import Modeswitcher from "@/components/navbar"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import {
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import MenuBawah from "@/components/menu-bawah"
import AppSidebar from "@/components/app-sidebar"

export default function LayoutViewer({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="pb-20 md:pb-0">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex justify-end w-full p-3 gap-3">
            <Modeswitcher />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        {children}
      </SidebarInset>
      <MenuBawah />
      {/* <SidebarRight /> */}
    </SidebarProvider>
  )
}
