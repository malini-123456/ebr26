"use client";

import { getHasilDistribution } from "@/utils/hasil-dist";
import { IpmData } from "../ipm/ipm";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  ok: {
    label: "OK",
    color: "var(--chart-1)",
  },

  ng: {
    label: "NG",
    color: "var(--chart-2)"
  },
} satisfies ChartConfig

export default function IpmPie() {
  const data = getHasilDistribution(IpmData);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
        config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie
              data={data}
              dataKey="value"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {payload.visitors}
                  </text>
                )
              }}
              nameKey="name"/>
            </PieChart>
          </ChartContainer>
      </CardContent>
    </Card>
  )
}
// export default function IpmPie() {
//   const data = getHasilDistribution(IpmData);

//   return (
//     <div className="w-screen h-1/2">
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {data.map((entry) => (
//               <Cell
//                 key={`slice-${entry.name}`}
//                 />
//             ))}
//             </Pie>
//             <Tooltip/>
//             <Legend/>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }