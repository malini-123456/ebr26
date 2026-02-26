import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { AlatData } from "../alat/alat";
import ModalTable from "./components/modal-table";

export default function ModalIpm () {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>Add Ipm</Button>
          </DialogTrigger>
          <DialogContent className="no-scrollbar -mx-4 h-screen overflow-y-auto">
            <ModalTable
            data={AlatData}
            totalItems={AlatData.length}/>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}