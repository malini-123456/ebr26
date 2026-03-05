import PageContainer from "@/components/layout/page-container";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ModalIpm from "@/features/ipm/modal";

export default async function Page() {
  const user = await currentUser();

  // // 1) Build a quick lookup for alat by id
  // const alatMap = new Map(AlatData.map(a => [a.id_alat, a]));

  // // 2) Flatten IPM + Alat into IpmRow[]
  // const rows: IpmRow[] = IpmData.map((i) => ({
  //   ...i,
  //   nama_alat: alatMap.get(i.AlatId)?.nama_alat ?? "—",
  //   merek: alatMap.get(i.AlatId)?.merek ?? "—",
  //   tipe: alatMap.get(i.AlatId)?.tipe ?? "—",
  //   no_seri: alatMap.get(i.AlatId)?.no_seri ?? "—",
  //   ruangan: alatMap.get(i.AlatId)?.ruangan ?? "—",
  // }));

  return (
    <PageContainer
      scrollable={false}
      pageHeaderAction={
        <Link
          href="./ipm/create"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <IconPlus />Ipm
        </Link>
      }
    >
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={5} rowCount={6} filterCount={2} />
        }
      >
        {/* <ModalIpm/> */}
      </Suspense>
    </PageContainer >
  );
}