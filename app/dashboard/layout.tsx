import AppSidebar from "@/components/app-sidebar";
import KBar from "@/components/kbar";
import Modeswitcher from "@/components/navbar";
import SearchInput from "@/components/search-input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { cookies } from 'next/headers';

export default async function Layout({ 
  children
 }: { 
  children: React.ReactNode;
 }) {
  const cookieStore = await cookies();
  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="justify-end-safe flex w-full p-3 gap-3">
              <SearchInput />
              <Modeswitcher />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  )
}
