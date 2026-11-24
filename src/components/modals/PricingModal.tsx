import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Check, Zap, X, ShieldCheck, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, upgradeToPro, simulateProUpgrade, downgradeToFree } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
              Simple Transparent Pricing
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Upgrade to ReziCV Pro</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Beat ATS algorithms and land interviews with unlimited AI tools & templates.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free Tier */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Free Starter</div>
              <div className="text-2xl font-bold text-white mt-1">$0</div>
              <p className="text-xs text-slate-500 mt-1">Get started with a basic ATS resume.</p>

              <ul className="space-y-2.5 text-xs text-slate-300 mt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>1 Resume Version</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Classic RenderCV Template</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Basic ATS Scorer</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <span className="w-4 text-center">—</span>
                  <span>Unlimited AI Rewrites</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <span className="w-4 text-center">—</span>
                  <span>Job Description Matcher</span>
                </li>
              </ul>
            </div>

            {user?.isPro ? (
              <button
                onClick={downgradeToFree}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
              >
                Downgrade to Free
              </button>
            ) : (
              <div className="py-2 text-center text-xs text-slate-400 font-medium bg-slate-900 rounded-xl">
                Current Plan
              </div>
            )}
          </div>

          {/* Pro Tier (Stripe Test Mode) */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-950 border-2 border-emerald-500 flex flex-col justify-between space-y-4 relative">
            <div className="absolute -top-3 right-5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Pro Lifetime / Monthly</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-white">$19</span>
                <span className="text-xs text-slate-400 font-normal">one-time (or $9/mo)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Unlimited power for aggressive job hunting.</p>

              <ul className="space-y-2.5 text-xs text-slate-200 mt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-white">Unlimited Resume Versions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>All 5 RenderCV Themes (SB2Nov, ModernCV, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited AI STAR Bullet Rewriter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Target Job Description Tailoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Full RenderCV Code & Vector PDF Export</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                onClick={upgradeToPro}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Checkout with Stripe (Test Mode)</span>
              </button>

              <button
                onClick={() => {
                  simulateProUpgrade();
                  onClose();
                }}
                className="w-full py-1.5 bg-slate-800/80 hover:bg-slate-800 text-emerald-400 text-[11px] font-semibold rounded-lg transition"
              >
                ⚡ Instant Test Upgrade (No Card Required)
              </button>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span>Stripe secure 256-bit encryption. Cancel or test anytime.</span>
        </div>
      </div>
    </div>
  );
};
