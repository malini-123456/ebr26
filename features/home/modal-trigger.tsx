import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { prisma } from "@/lib/prisma";
import { IconPlus } from "@tabler/icons-react";
import FormBets from "./modal-bets";
import { CreateBets } from "@/app/action/action";

export default async function ModalBets() {
  const products = await prisma.produk.findMany()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><IconPlus />Bets</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>tambah Bets</DialogTitle>
          <DialogDescription>
            Isi data bets baru di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <form action={CreateBets}>
          <FormBets products={products} />
        </form>
      </DialogContent>
    </Dialog>
  )
}