import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingViewer() {
  return (
    <main>
      <div className="
    grid grid-cols-1 md:grid-cols-3 rounded-xl gap-3 mt-4">
        <Card className="@container/card rounded-xl">
          <CardHeader className="relative">
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <Skeleton className="h-16 w-full" />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card rounded-xl">
          <CardHeader className="relative">
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <Skeleton className="h-16 w-full" />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card rounded-xl">
          <CardHeader className="relative">
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <Skeleton className="h-16 w-full" />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-3 md:gap-3">
        <Card>
          <CardContent>
            <Skeleton className="h-48 md:h-80" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Skeleton className="h-48 md:h-80" />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}