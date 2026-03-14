import { BouncingDots } from "@/components/bouncing-dots";

export default function LoadingPage() {
  return (
    <div className="absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <BouncingDots />
    </div>
  )
}