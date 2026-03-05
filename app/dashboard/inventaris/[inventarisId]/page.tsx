import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import AlatCard from "@/features/alat/components/alat-card";
import { cn } from "@/lib/utils";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";

export default async function InvPage({
  params,
}: {
  params: Promise<{ inventarisId: string }>
}) {

  const { inventarisId } = await params

  const id = Number(inventarisId)

  if (isNaN(id)) {
    return <div>ID tidak valid</div>
  }

  return (
    <PageContainer
      pageHeaderAction={
        <Link
          href={`/dashboard/inventaris/${id}/edit`}
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <Edit2Icon />Edit
        </Link>
      }
    >
      <AlatCard id={id} />
    </PageContainer>
  );
}