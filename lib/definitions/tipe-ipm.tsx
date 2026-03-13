import { Prisma } from "@/generated/prisma/client";

export type AlatDashboard = Prisma.AlatGetPayload<{
  include: {
    ruangan: true
    ipm: {
      // include: {
      //   user: true
      // }
      orderBy: {
        createdAt: "desc"
      }
      take: 1
    }
  }
}>


export type IpmWithRelations = Prisma.IpmGetPayload<{
  include: {
    alat: {
      include: {
        ruangan: true
      }
    }
    // user: true
  }
}>;