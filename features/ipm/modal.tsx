import ContributorsOverviewTable from "@/components/contributors-overview-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { prisma } from "@/lib/prisma";
import { IconPlus } from "@tabler/icons-react";

export default async function ModalIpm() {
  const alats = await prisma.alat.findMany({
    include: {
      ruangan: true,
      ipm: true,
    },
  });
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button><IconPlus />Add Ipm</Button>
        </DialogTrigger>
        <DialogContent className="mx-4 h-screen w-4xl">
          <ContributorsOverviewTable data={alats} />
        </DialogContent>
      </Dialog>
    </div>
  )
}