import { useEffect, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import bloom from "@/assets/hero-bloom.jpg";

function useCurrentPath() {
  const getPath = () => window.location.pathname;
  const [path, setPath] = useState<string>(getPath());

  useEffect(() => {
    const handlePopState = () => setPath(getPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return path;
}

function GuidePage() {
  const guideItems = [
    {
      number: "1",
      title: "Wash and prep",
      description:
        "Wash your hands before use. If it’s your first time, rinse the cup with water and sterilise it once as directed.",
    },
    {
      number: "2",
      title: "Choose a fold",
      description:
        "Try a C-fold or punch-down fold for easier insertion and a comfortable fit low in the canal.",
    },
    {
      number: "3",
      title: "Insert low and back",
      description:
        "Sit or squat in a relaxed position and insert it low, angled slightly toward the tailbone.",
    },
    {
      number: "4",
      title: "Let it open",
      description:
        "Release the fold and let the cup open. A gentle twist helps create a seal and keeps it in place.",
    },
    {
      number: "5",
      title: "Empty and rinse",
      description:
        "Empty every 8–12 hours, rinse, and reinsert. Most people settle into a morning and night routine.",
    },
    {
      number: "6",
      title: "Clean and store",
      description:
        "Wash with a gentle cup wash and dry fully before storing it in a breathable cotton pouch.",
    },
  ];

  return (
    <div className="guide-page">
      <header className="guide-header">
        <a href="/" className="brand-link">
          SheThrives
        </a>
        <button type="button" className="menu-button">
          Menu
        </button>
      </header>

      <main className="guide-main">
        <article className="guide-article">
          <div className="guide-kicker">User guide · Menstrual cup basics</div>

          <div className="guide-hero">
            <h1>How to use a menstrual cup</h1>
            <p>Simple steps for a comfortable, low-stress start.</p>
          </div>

          <div className="guide-specs" aria-label="Product details">
            <div className="guide-spec">
              <span>Wear time</span>
              <strong>8–12 hrs</strong>
            </div>
            <div className="guide-spec">
              <span>Material</span>
              <strong>Medical silicone</strong>
            </div>
            <div className="guide-spec">
              <span>Lifespan</span>
              <strong>Up to 5 years</strong>
            </div>
          </div>

          <div className="guide-steps-grid">
            {guideItems.map((item) => (
              <div key={item.number} className="guide-step">
                <div className="step-number">{item.number}</div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <section className="guide-section guide-section-split">
            <div>
              <h2>How to insert it comfortably</h2>
              <ol>
                <li>Wash your hands and choose a fold that feels easiest for you.</li>
                <li>Relax your body and sit or squat so the cup sits low without pressure.</li>
                <li>Insert it low and angled slightly toward the tailbone.</li>
                <li>Release the fold and gently rotate it to help it open and seal.</li>
                <li>If it feels uncomfortable, remove it and try again — it should never feel forced.</li>
              </ol>
            </div>

            <div className="guide-note">
              <p className="note-label">Quick note</p>
              <p>The cup should feel secure and comfortable, not pushed too far in.</p>
            </div>
          </section>

          <section className="guide-section guide-removal">
            <h2>Removing it safely</h2>
            <div className="removal-layout">
              <div className="removal-copy">
                <p>
                  Wash your hands, relax your body, and bear down gently. Pinch the base of the cup to release the seal and pull it down slowly.
                </p>
                <p>Never pull on the stem alone. It is only there to guide the cup when needed.</p>
              </div>
              <div className="removal-illustration">removal + cleaning diagram</div>
            </div>
          </section>

          <section className="guide-section guide-care">
            <div className="care-copy">
              <h2>Care &amp; cleaning</h2>
              <ul>
                <li>Rinse with clean water after each use.</li>
                <li>Wash with a gentle, pH-balanced cup wash.</li>
                <li>Store it dry in a breathable cotton pouch.</li>
                <li>Steer clear of harsh soaps or scented products.</li>
              </ul>
            </div>

            <div className="tips-copy">
              <h2>Beginner tips</h2>
              <p>Start in a relaxed position. Tension makes insertion feel harder than it is.</p>
              <p>If it feels uncomfortable, it may need to sit slightly lower or be adjusted gently.</p>
              <p>Pinch the base to release the seal before removing.</p>
              <p>A well-placed cup should feel secure, not forced or painful.</p>
            </div>
          </section>

          <section className="guide-section faq-section">
            <h2>Common questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <p className="faq-question">Does it hurt the first time?</p>
                <p>It should not. If it feels uncomfortable, adjust the position or move it slightly lower.</p>
              </div>
              <div className="faq-item">
                <p className="faq-question">Can it get lost inside me?</p>
                <p>No. It stays in the vaginal canal and cannot travel beyond the cervix.</p>
              </div>
              <div className="faq-item">
                <p className="faq-question">How often do I empty it?</p>
                <p>Most people empty it every 8–12 hours, depending on flow and comfort.</p>
              </div>
            </div>
          </section>

          <section className="guide-cta">
            <p>Ready to begin?</p>
            <h3>You do not need to get it perfect on the first try.</h3>
            <div className="cta-links">
              <a href="/shop">View the cup</a>
              <a href="/how-it-works">Read the full guide</a>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}

function LaunchPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(new Set());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);

    if (submittedEmails.has(trimmed)) {
      toast.success("You're already on the list ✿");
      setEmail("");
      return;
    }

    setSubmittedEmails((prev) => new Set(prev).add(trimmed));
    setEmail("");
    toast.success("You're on the list ✿ See you at launch.");
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
            <span className="text-bloom">She</span>
            <span className="text-accent">Thrives</span>
            <span className="text-bloom">.</span>
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
            We&apos;re putting the finishing touches on something built for you. Be the first to know when we launch.
          </p>

          <form onSubmit={submit} className="animate-fade-up mt-12 w-full max-w-md" style={{ animationDelay: "0.4s" }}>
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
            <p className="mt-3 text-xs text-muted-foreground">No spam — only a love letter when we launch.</p>
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

export default function App() {
  const path = useCurrentPath();
  const isGuideRoute = path === "/guide" || path === "/guide/";

  return isGuideRoute ? <GuidePage /> : <LaunchPage />;
}
