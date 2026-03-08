import { Prisma } from "@/generated/prisma/client";

export type AlatWithIpm = Prisma.AlatGetPayload<{
  include: {
    ipm: true;
    ruangan: true;
  };
}>;