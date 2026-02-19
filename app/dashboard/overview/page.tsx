import PageContainer from "@/components/layout/page-container";
import { ChartPieDonutText } from "@/components/pie-chart";
import { ProductTable } from "@/features/inv";
import { invColumns } from "@/lib/columns/inv.columns";
import { invData } from "@/prisma/inv.data";

export default function Page() {
  return (
    <PageContainer
      scrollable={false}
      pageTitle="Hi, Welcome Back">
        <ChartPieDonutText/>
        <ProductTable
          data={invData}
          totalItems={invData.length}
          columns={invColumns}
          />
    </PageContainer>
  )
}