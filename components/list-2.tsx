import {
  ArrowRight,
  Award,
  Building2,
  HeartHandshake,
  Hospital,
  Leaf,
  Lightbulb,
  Trophy,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export default async function List2() {
  const ruangan = await prisma.ruangan.findMany();
  return (
    <section className="py-2">
      <div className="container mx-auto px-0 md:px-8">
        <div className="flex flex-col">
          <Separator />
          {ruangan.map((item) => (
            <React.Fragment key={item.id}>
              <div className="grid items-center gap-4 px-4 py-2 md:grid-cols-4 hover:bg-secondary">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Hospital />
                  </span>
                  {/* <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{item.namaRuangan}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.namaRuangan}
                    </p>
                  </div> */}
                </div>
                <p className="order-1 text-xl font-medium md:order-none md:col-span-2">
                  {item.namaRuangan}
                </p>
                <Button variant="outline" asChild>
                  <a
                    className="order-3 ml-auto w-fit gap-2 md:order-none"
                    href={item.namaRuangan}
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
