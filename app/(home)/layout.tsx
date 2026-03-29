import AppSidebar from "@/components/app-sidebar";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import KBar from "@/components/kbar";
import MenuBawah from "@/components/menu-bawah";
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
        <SidebarInset className="pb-20 md:pb-0">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hidden lg:block" />
            <div className="flex flex-1 items-center gap-2 py-3">
              <DynamicBreadcrumb />
            </div>
            <div className="flex items-center gap-3 py-3">
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

      <MenuBawah />
    </KBar>
  )
}
