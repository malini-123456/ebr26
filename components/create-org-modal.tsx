"use client"

import { CreateOrganization } from "@clerk/nextjs"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function CreateOrgModal() {
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="p-0 w-fit max-w-fit border-none bg-transparent shadow-none"
      >
        <CreateOrganization afterCreateOrganizationUrl="/home" />
      </DialogContent>
    </Dialog>
  )
}
