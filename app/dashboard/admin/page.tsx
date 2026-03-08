import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { removeRole, setRole } from "./actions";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDeviceDesktopAnalytics, IconDotsVertical, IconLockOpen2, IconUserOff } from "@tabler/icons-react";

export default async function AdminDashboard() {
  const isAdmin = await checkRole('admin')
  const client = await clerkClient();

  const users = (await client.users.getUserList()).data;

  if (!isAdmin) {
    redirect('/dashboard/overview')
  }
  return (
    <PageContainer
      pageTitle="Daftar User">
      <div className="mx-auto rounded-xl border border-border bg-background p-4">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="flex justify-between">
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          {users.map((user) => {
            return (
              <TableRow key={user.id} className="hover:bg-muted/40 transition-colors flex justify-between">
                <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                <TableCell>
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </TableCell>
                <TableCell>
                  <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${user.publicMetadata.role as string === "admin"
                    ? "bg-green-100 text-green-700"
                    : user.publicMetadata.role as string === "moderator"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"}`}>
                    {user.publicMetadata.role as string}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon-sm" className="rounded-xl">
                        <IconDotsVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <IconDeviceDesktopAnalytics />
                        <form action={setRole} className="inline">
                          <input type="hidden" value={user.id} name="id" />
                          <input type="hidden" value="admin" name="role" />
                          <Button
                            type="submit"
                            variant="ghost"
                          >
                            Make Admin
                          </Button>
                        </form>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconLockOpen2 />
                        <form action={setRole} className="inline">
                          <input type="hidden" value={user.id} name="id" />
                          <input type="hidden" value="moderator" name="role" />
                          <Button
                            type="submit"
                            variant="ghost"
                          >
                            Make Moderator
                          </Button>
                        </form>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="bg-red-100 text-red-700">
                        <IconUserOff />
                        <form action={removeRole} className="inline">
                          <input type="hidden" value={user.id} name="id" />
                          <Button
                            type="submit"
                            variant="ghost"
                          >
                            Reset Role
                          </Button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </div>
    </PageContainer>
  );
}