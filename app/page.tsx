import { SignUpButton, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import LandingHeader from "@/components/landing-header";
import CreateOrgModal from "@/components/create-org-modal";
import {
  ClipboardList,
  ShieldCheck,
  BarChart3,
  Zap,
  Users,
  FileCheck2,
} from "lucide-react";
import DarkVeil from "@/components/dark-veil";
import LightPillar from "@/components/LightPillar";

export default async function Home() {
  const { userId, orgId } = await auth();
  if (userId && orgId) redirect("/home");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {userId && !orgId && <CreateOrgModal />}
      <LandingHeader />
      {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
         <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        /> 
      </div> */}

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-40 pb-24 text-center sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          Electronic Batch Record
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Streamline Your
          <br />
          <span className="text-primary">Batch Manufacturing</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Replace paper-based batch records with a secure, compliant, and
          real-time digital platform. Increase efficiency, reduce errors, and
          stay audit-ready at all times.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <SignedOut>
            <SignUpButton>
              <Button
                size="lg"
                className="rounded-full cursor-pointer px-8 text-base font-semibold">
                Get Started Free
              </Button>
            </SignUpButton>
          </SignedOut>
          <a href="#how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full cursor-pointer px-8 text-base font-semibold">
              See How It Works
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for compliance
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for pharmaceutical, biotech, and regulated manufacturing
              industries.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ClipboardList,
                title: "Digital Batch Records",
                desc: "Create, fill, and approve batch records entirely online — no paper, no lost documents.",
              },
              {
                icon: ShieldCheck,
                title: "21 CFR Part 11 Ready",
                desc: "Electronic signatures, audit trails, and access controls built in from day one.",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                desc: "Monitor batch progress and quality metrics with live dashboards and reports.",
              },
              {
                icon: Zap,
                title: "Automated Workflows",
                desc: "Define approval chains and automatically route records to the right team members.",
              },
              {
                icon: Users,
                title: "Role-Based Access",
                desc: "Fine-grained permissions ensure that each user sees and does exactly what they should.",
              },
              {
                icon: FileCheck2,
                title: "Instant Audit Trails",
                desc: "Every change is logged with a timestamp and user identity — always inspection-ready.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Up and running in minutes, not months.
            </p>
          </div>
          <div className="relative grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create a Batch",
                desc: "Select a master batch record template and start a new production batch with a single click.",
              },
              {
                step: "02",
                title: "Record & Review",
                desc: "Operators fill in process steps in real time. Supervisors review and e-sign inline.",
              },
              {
                step: "03",
                title: "Release & Archive",
                desc: "QA releases the batch with a full audit trail. Records are archived securely in the cloud.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why teams choose EBR
              </h2>
              <p className="mt-4 text-muted-foreground">
                From small manufacturers to large pharmaceutical companies, EBR
                helps teams save time, reduce risk, and maintain full compliance.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Reduce batch release time by up to 60%",
                  "Eliminate transcription errors with guided data entry",
                  "Pass audits with confidence — every record is complete",
                  "Integrate with your existing ERP and LIMS systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "60%", label: "Faster batch release" },
                { value: "0", label: "Paper records" },
                { value: "100%", label: "Audit trail coverage" },
                { value: "24/7", label: "Cloud availability" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                  <p className="text-3xl font-bold text-primary">{value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to go paperless?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join teams already using EBR to streamline their manufacturing
            operations and stay compliant with ease.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <SignedOut>
              <SignUpButton>
                <Button
                  size="lg"
                  className="rounded-full cursor-pointer px-8 text-base font-semibold">
                  Start for Free
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} EBR — Electronic Batch Record. All rights reserved.
      </footer>
    </div>
  );
}
