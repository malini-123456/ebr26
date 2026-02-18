import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import data from "./data.json"
import PageContainer from "@/components/layout/page-container";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <PageContainer
      scrollable={false}
      pageTitle='Dashboard'
      pageDescription="Manage"
      pageHeaderAction={
      <Button>
        <IconPlus/>Add
      </Button>}
    >
      <div className="flex flex-1">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋🏻
          </h2>
        </div>
      </div>
      <DataTable data={data}/>
    </PageContainer>
  )
}