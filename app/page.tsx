import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
      <div className="fixed top-0 left-0 right-0 -z-10 h-[500px] w-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl"></div>

      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">RAG System</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            v1.0 is now available
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Build intelligent <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
              RAG Applications
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed">
            Empower your data with our advanced Retrieval-Augmented Generation system.
            Connect your knowledge base and get accurate, context-aware answers in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Start Building Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demo"
              className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-8 py-3.5 text-base font-semibold text-foreground hover:bg-accent/50 transition-colors backdrop-blur-sm"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Lightning Fast"
            description="Optimized vector search ensures you get results in milliseconds, not seconds."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-blue-500" />}
            title="Enterprise Secure"
            description="Your data is encrypted at rest and in transit. SOC2 compliant infrastructure."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6 text-purple-500" />}
            title="High Accuracy"
            description="Advanced reranking and hybrid search algorithms for superior result relevance."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © 2024 RAG System Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 hover:bg-card/80 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-xl bg-background p-3 shadow-sm ring-1 ring-border">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
