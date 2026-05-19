import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import bloom from "@/assets/hero-bloom.jpg";

export default function App() {
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
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <a href="/" className="font-display font-medium text-2xl md:text-3xl tracking-tight leading-none">
            <span className="text-bloom">She</span><span className="text-accent">Thrives</span><span className="text-bloom">.</span>
          </a>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-bloom/50 bg-bloom/10 backdrop-blur px-6 py-2 text-sm tracking-[0.2em] uppercase text-bloom font-medium shadow-[0_0_20px_rgba(255,182,193,0.3)]">
            <span className="h-2 w-2 rounded-full bg-bloom animate-pulse" />
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
