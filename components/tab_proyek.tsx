import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table";
import data from "../app/dashboard/data.json";

export function TabsLine() {
  return (
    <Tabs defaultValue="project">
      <TabsList variant="line" className="flex flex-row justify-center">
        <TabsTrigger value="project">Project</TabsTrigger>
        <TabsTrigger value="analytics">Insitu</TabsTrigger>
        <TabsTrigger value="reports">Eksitu</TabsTrigger>
        <TabsTrigger value="subkon">Subkon</TabsTrigger>
      </TabsList>
      <TabsContent value="project">
        <DataTable data={data} />
      </TabsContent>
    </Tabs>
  )
}
