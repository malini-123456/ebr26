import { AppSidebar } from "@/components/app-sidebar";
import Modeswitcher from "@/components/navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" /> 
          <div className="justify-end-safe flex w-full p-3 gap-3">
            <Modeswitcher/>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>  
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
