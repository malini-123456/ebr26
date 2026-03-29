'use client';
import { deleteBets } from '@/app/action/action';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { BetsGetPayload } from '@/generated/prisma/models';
import { IconEdit, IconDotsVertical, IconTrash, IconPdf } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const checklistItems = [
  { key: "ruangandibersihkan", label: "Ruangan Telah Dibersihkan" },
  { key: "statuskebersihan", label: "Tersedia Status Kebersihan Ruangan" },
  { key: "alatproduksi", label: "Alat Produksi Lengkap" },
  { key: "alatdibersihkan", label: "Alat Telah Dibersihkan & Disanitasi" },
  { key: "alatbekerja", label: "Alat Dapat Bekerja Dengan Baik" },
  { key: "bahancukup", label: "Tersedia Bahan dlm Jumlah Cukup & Lengkap" },
  { key: "bahanlengkap", label: "Bahan Lengkap" },
  { key: "bahanjumlah", label: "Jumlah Bahan Mencukupi" },
  { key: "batchrecord", label: "Tersedia Batch Record" },
]

interface CellActionProps {
  data: BetsGetPayload<{ include: { produk: true } }>;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = () => {
    startTransition(async () => {
      try {
        await deleteBets(data.id)
        setOpen(false)
        router.refresh()
        toast.success('Item deleted successfully')
      } catch (error) {
        toast.error('Failed to delete item')
      }
    })
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/bets/proses1/${data.id}`)}
          >
            <IconEdit className='mr-2 h-4 w-4' /> Proceed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
