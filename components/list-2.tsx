import {
  ArrowRight,
  Award,
  Building2,
  HeartHandshake,
  Hospital,
  Leaf,
  Lightbulb,
  QrCode,
  Trophy,
} from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function List2() {
  const ruangan = await prisma.ruangan.findMany();
  return (
    <section className="py-2">
      <div className="container mx-auto px-0 md:px-8">
        <div className="flex flex-col">
          <Separator />
          {ruangan.map((item) => (
            <React.Fragment key={item.id}>
              <div className="grid items-center gap-4 px-4 py-2  hover:bg-secondary">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Hospital />
                  </span>

                  <p className="order-1 text-xl font-medium md:order-none md:col-span-2">
                    {item.namaRuangan}
                  </p>
                  <Button variant="outline" asChild>
                    <Link
                      href={`./ruangan/${item.id}`}
                      className="order-3 ml-auto w-fit gap-2 md:order-none">
                      <span>View Details</span>

                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" className="cursor-pointer">
                        <QrCode />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download QR Code</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
