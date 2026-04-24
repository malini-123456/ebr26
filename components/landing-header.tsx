"use client";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Modeswitcher from "@/components/navbar";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
        </nav>

        <div className="flex items-center gap-2">
          <Modeswitcher />
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" className="rounded-full cursor-pointer">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="rounded-full cursor-pointer bg-primary text-primary-foreground">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
