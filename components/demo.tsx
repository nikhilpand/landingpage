import KineticGrid from "@/components/ui/kinetic-grid";
import { ArrowRight, ShieldCheck, LayoutDashboard, Sparkles } from "lucide-react";

export default function Default() {
  return (
    <KineticGrid>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Badge with Lucide Icon */}
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          Interactive Background
        </span>

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Move your cursor. Click anywhere.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-lg text-base text-white/60">
          A kinetic grid that warps toward the pointer and ripples on every click. Integrated with real-time inspection physics.
        </p>

        {/* Action Button to Admin Panel */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://adminaccess.kxoproduction.in/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-neutral-100"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to Admin Panel
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#platform"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Verify System
          </a>
        </div>

        {/* Stock Image Cards Preview */}
        <div className="mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md text-left">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
              alt="Field Inspection Technology"
              className="h-36 w-full rounded-xl object-cover"
            />
            <h3 className="mt-3 text-sm font-semibold text-white">Smart Inspection</h3>
            <p className="mt-1 text-xs text-white/50">Real-time mobile field presence telemetry.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md text-left">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
              alt="Real-time Monitoring Analytics"
              className="h-36 w-full rounded-xl object-cover"
            />
            <h3 className="mt-3 text-sm font-semibold text-white">Command Analytics</h3>
            <p className="mt-1 text-xs text-white/50">Sub-second WebSocket siren dispatch.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md text-left">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
              alt="Verified Compliance"
              className="h-36 w-full rounded-xl object-cover"
            />
            <h3 className="mt-3 text-sm font-semibold text-white">Zero-Trust Registry</h3>
            <p className="mt-1 text-xs text-white/50">Cryptographically sealed audit trail.</p>
          </div>
        </div>
      </div>
    </KineticGrid>
  );
}
