"use client"

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function FilledCalendar({
  ipmCountByDate,
}: {
  ipmCountByDate: Record<string, number>;
}) {

  function formatDate(date: Date) {
    return date.toLocaleDateString("id-ID");
  }

  const datesWithIPM = Object.keys(ipmCountByDate).map(
    (d) => new Date(d)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pemeliharaan Harian</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="mx-auto">
        <Calendar
          mode="single"
          numberOfMonths={1}
          className="rounded-lg border [--cell-size:--spacing(9)] md:[--cell-size:--spacing(12) lg:[--cell-size:--spacing(18) ]"
          modifiers={{
            hasIPM: datesWithIPM,
          }}
          modifiersClassNames={{
            hasIPM: "bg-blue-100",
          }}
          components={{
            Day: (props) => {
              const date = props.day.date;
              const key = formatDate(date);
              const count = ipmCountByDate[key];

              return (
                <div className="relative w-full h-full">
                  {/* ✅ keep original day button */}
                  {props.children}

                  {/* ✅ overlay your count */}
                  {count && (
                    <span className="absolute bottom-0 right-0 text-[15px] text-primary rounded-full w-4 h-4 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  )
}