import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Zap,
  Target,
  FileText,
  Shield,
  ArrowRight,
  Star,
  Users,
  Code2,
  Download,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onStartBuilding: () => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStartBuilding, onOpenPricing }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Powered by RenderCV ATS Standards & AI Tailoring</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          The AI Resume Builder That Gets You{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Hired
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Create clean, recruiter-approved resumes in minutes. AI-driven STAR bullet rewriting,
          instant job description tailoring, and battle-tested RenderCV typography that beats every ATS.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStartBuilding}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Build Your Free Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPricing}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-sm transition"
          >
            View Pricing ($19 Lifetime)
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">4.9 / 5</span>
            <span>from 10,000+ candidates</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>98.4% ATS Parsing Accuracy</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>100% RenderCV Schema Compatible</span>
          </div>
        </div>

        {/* Interactive Before & After Transformation Demo */}
        <div className="mt-14 max-w-4xl mx-auto p-6 bg-slate-900/90 border border-slate-800 rounded-3xl text-left shadow-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>See The AI Impact (Before & After)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-500/20 rounded-2xl">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-2">
                ❌ Typical Weak Bullet (Ignored by ATS)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "Worked on backend API services and helped the team fix latency issues and bugs."
              </p>
              <div className="mt-3 text-[10px] text-slate-500">
                Lacks metrics, passive phrasing ("worked on", "helped"), zero action impact.
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 border border-emerald-500/40 rounded-2xl">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>✨ ReziCV AI Rewrite (STAR Impact)</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                "Architected event-driven Go microservices handling 4.2M daily requests, slashing p99 API latency by 42% and preventing 99.9% of transient transaction drops."
              </p>
              <div className="mt-3 text-[10px] text-emerald-400/80 font-medium">
                Quantified metrics, high-agency action verb ("Architected"), and clear business outcome.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Engineered to Beat the Algorithms
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every detail is designed according to modern Applicant Tracking System guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Target Job Description Matcher</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste any job description to instantly uncover missing keywords and generate
                tailored bullet points specifically targeting recruiter requirements.
              </p>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">RenderCV Open Standards</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean single-column layouts, standard headers, and Harvard & SB2Nov styling. Export
                vector-crisp printable PDFs or raw RenderCV YAML code.
              </p>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">AI STAR Bullet Enhancer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Switch between Impact, Metrics-Driven, Executive, and Concise modes to turn any
                responsibility into a verified achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Charge: Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white">Simple, Honest Pricing</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Start for free, upgrade when you're ready to accelerate your search.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 text-left">
          {/* Free Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Free Starter</div>
              <div className="text-3xl font-bold text-white mt-1">$0</div>
              <p className="text-xs text-slate-400 mt-1">Single resume for quick applications.</p>
              <ul className="space-y-2 text-xs text-slate-300 mt-4">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1 Resume Version</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Classic Harvard Template</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> PDF & YAML Export</li>
              </ul>
            </div>
            <button
              onClick={onStartBuilding}
              className="w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-950/40 to-slate-900 border-2 border-emerald-500 flex flex-col justify-between space-y-4 relative">
            <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Pro Tier</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-white">$19</span>
                <span className="text-xs text-slate-400">one-time / $9 mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Unlimited power to land interviews fast.</p>
              <ul className="space-y-2 text-xs text-slate-200 mt-4">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Resume Versions</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> All 5 RenderCV Themes (SB2Nov, etc.)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited AI Job Description Tailoring</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Priority Vector PDF Export</li>
              </ul>
            </div>
            <button
              onClick={onOpenPricing}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Upgrade to Pro (Stripe Ready)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 ReziCV. Built with RenderCV standards. Ready for local and Vercel cloud deployment.</p>
      </footer>
    </div>
  );
};
