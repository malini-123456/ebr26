import Modeswitcher from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function RuanganPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold tracking-tight">IPMKLK</span>
          <Modeswitcher />
        </div>
        <Separator />
      </header>
      <main className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full">
        {children}
      </main>
      <footer className="text-center text-xs text-muted-foreground py-4">
        © {new Date().getFullYear()} IPMKLK
      </footer>
    </div>
  );
}
