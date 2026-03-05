import PageContainer from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { createipm } from "@/app/action/action";

export default function CreateIpm() {
  return (
    <PageContainer
      scrollable={true}
      pageTitle={<div>Tambah IPM</div>}
      pageDescription="Form IPM baru"
    >
      <Card>
        <form action={createipm}>
          <CreateIpm />
        </form>
      </Card>
    </PageContainer>
  )
}