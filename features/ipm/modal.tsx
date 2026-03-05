import ContributorsOverviewTable from "@/components/contributors-overview-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";

export default function ModalIpm() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button><IconPlus />Add Ipm</Button>
        </DialogTrigger>
        <DialogContent className="mx-4 h-screen w-4xl">
          <ContributorsOverviewTable />
        </DialogContent>
      </Dialog>
    </div>
  )
}