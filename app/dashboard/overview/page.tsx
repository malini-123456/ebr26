
import { Datatable } from "@/components/data-table/data-table";
import PageContainer from "@/components/layout/page-container";
import { invColumns } from "@/lib/columns/inv.columns";
import { invData } from "@/prisma/inv.data";

export default function Page() {
  return (
    <PageContainer
      scrollable={false}>
      <div className="flex flex-1">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 🍑
          </h2>
        </div>
      </div>
      <Datatable
        data={invData}
        columns={invColumns}
      />
    </PageContainer>
  )
}