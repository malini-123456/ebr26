import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import AlatCard from "@/features/alat/components/alat-card";
import { Edit2Icon } from "lucide-react";

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
        <Button className="bg-amber-300" variant="outline">
          <Edit2Icon /> Edit
        </Button>
      }
    >
      <AlatCard id={id} />
    </PageContainer>
  );
}