import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { AlatData } from "../alat/alat";
import ModalTable from "./components/modal-table";
import { IconPlus } from "@tabler/icons-react";

export default function ModalIpm () {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button><IconPlus/>Add Ipm</Button>
          </DialogTrigger>
          <DialogContent className="no-scrollbar mx-4 h-screen w-full">
            <ModalTable
            data={AlatData}
            totalItems={AlatData.length}/>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}