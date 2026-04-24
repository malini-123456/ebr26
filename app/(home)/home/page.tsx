import PageContainer from "@/components/layout/page-container";
import { BetsDataTable } from "@/features/bets/datatable-bets";
import { SectionCards } from "@/features/bets/stats";
import ModalBets from "@/features/home/modal-trigger";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  const { isAuthenticated, orgId } = await auth();

  if (!isAuthenticated) redirect("/sign-in");
  if (!orgId) redirect("/");

  const data = await prisma.bets.findMany({
    where: { organizationId: orgId ?? "" },
    include: {
      produk: true,
      inspectionSession: true,
      penimbanganSession: true,
    },
  });

  const totalItems = await prisma.bets.count(
    {
      where: {
        organizationId: orgId ?? ""
      }
    });

  return (
    <PageContainer
      scrollable={false}
      pageTitle={<div>Hi {user?.username}, welcome back 👋🏻</div>}
      pageHeaderAction={
        <ModalBets />
      }
    >
      <SectionCards />
      <div className="mt-6" />
      <BetsDataTable
        data={data}
        totalItems={totalItems} />
    </PageContainer>
  )
}