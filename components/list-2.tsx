import {
  ArrowRight,
  Hospital,
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
import { QrDownloadButton } from "@/components/qr-download-button";

export default async function List2({ q }: { q?: string }) {
  const ruangan = await prisma.ruangan.findMany({
    where: q ? { namaRuangan: { contains: q, mode: "insensitive" } } : undefined,
  });
  return (
    <section className="py-2">
      <div className="container mx-auto px-0 md:px-8">
        <div className="flex flex-col">
          <Separator />
          {ruangan.map((item) => (
            <React.Fragment key={item.id}>
              <div className="grid items-center gap-4 px-4 py-2  hover:bg-secondary">
                <div className="order-2 flex items-center gap-2 md:order-none">

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
                    <TooltipTrigger asChild>
                      <QrDownloadButton ruanganId={item.id} namaRuangan={item.namaRuangan} />
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
