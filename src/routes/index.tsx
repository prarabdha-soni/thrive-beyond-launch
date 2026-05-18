import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import bloom from "@/assets/hero-bloom.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SheThrives — Launching Soon" },
      {
        name: "description",
        content:
          "SheThrives is blooming. A space for women to grow, glow, and rise — launching soon. Join the waitlist.",
      },
      { property: "og:title", content: "SheThrives — Launching Soon" },
      {
        property: "og:description",
        content: "Something beautiful is on the way. Join the SheThrives waitlist.",
      },
    ],
  }),
});

const LAUNCH = new Date();
LAUNCH.setDate(LAUNCH.getDate() + 30);

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function TimeCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 sm:w-24 md:w-28 aspect-square rounded-2xl bg-card/70 backdrop-blur-md border border-border shadow-[var(--shadow-soft)] flex items-center justify-center overflow-hidden">
        <span className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-ink tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-border/60" />
      </div>
      <span className="mt-3 text-[0.7rem] tracking-[0.25em] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Index() {
  const { d, h, m, s } = useCountdown(LAUNCH);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're on the list ✿ See you at launch.");
    }, 700);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Toaster position="top-center" />

      {/* Floating bloom artwork */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem] opacity-70 animate-float"
        aria-hidden
      >
        <img
          src={bloom}
          alt=""
          className="w-full h-full object-cover rounded-full blur-[2px]"
          style={{ maskImage: "radial-gradient(circle, black 55%, transparent 75%)" }}
        />
      </div>
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 w-[24rem] h-[24rem] md:w-[32rem] md:h-[32rem] opacity-60 animate-float"
        style={{ animationDelay: "2s" }}
        aria-hidden
      >
        <img
          src={bloom}
          alt=""
          className="w-full h-full object-cover rounded-full blur-[3px]"
          style={{ maskImage: "radial-gradient(circle, black 50%, transparent 75%)" }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Nav */}
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-bloom" />
            <span className="font-display text-xl tracking-tight">SheThrives</span>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ink transition"
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">@shethrives</span>
          </a>
        </header>

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-bloom animate-pulse" />
            Launching Soon
          </div>

          <h1
            className="animate-fade-up mt-8 font-display font-light text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight max-w-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            Something <em className="italic text-shimmer">beautiful</em>
            <br />
            is blooming.
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            We're putting the finishing touches on something built for you.
            Be the first to know when we launch.
          </p>

          {/* Countdown */}
          <div
            className="animate-fade-up mt-12 flex items-center gap-3 sm:gap-5"
            style={{ animationDelay: "0.3s" }}
          >
            <TimeCell value={d} label="Days" />
            <TimeCell value={h} label="Hours" />
            <TimeCell value={m} label="Minutes" />
            <TimeCell value={s} label="Seconds" />
          </div>

          {/* Email form */}
          <form
            onSubmit={submit}
            className="animate-fade-up mt-12 w-full max-w-md"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md border border-border p-1.5 shadow-[var(--shadow-soft)]">
              <Mail className="h-4 w-4 text-muted-foreground ml-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-muted-foreground py-2"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-60"
              >
                {loading ? "…" : "Notify me"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              No spam — only a love letter when we launch.
            </p>
          </form>
        </section>

        <footer className="px-6 md:px-12 py-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} SheThrives</span>
          <span className="hidden sm:inline italic font-display">Made with care.</span>
        </footer>
      </div>
    </main>
  );
}
