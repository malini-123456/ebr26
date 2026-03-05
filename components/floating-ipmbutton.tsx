import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export function FloatingAdd() {

  return (
    <Button
      size="icon"
      className={cn(
        "fixed top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer top-96 right-5 lg:hidden",
      )}
    >
      <Plus className="h-5 w-5" />
    </Button>
  )
}