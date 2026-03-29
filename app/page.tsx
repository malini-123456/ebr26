import {
  SignInButton,
  SignUpButton,
  SignedOut,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/home");

  return (
    <div className="h-screen relative flex w-full max-w-7xl items-center justify-center overflow-hidden mx-auto">
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <SignedOut>
          <SignInButton>
            <Button
              variant="default"
              className="cursor-pointer rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
      {/* 
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={foto}
      /> */}
    </div>
  );
}
