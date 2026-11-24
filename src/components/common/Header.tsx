import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ResumeData, ResumeTheme } from '../../types/resume';
import {
  Sparkles,
  FileText,
  Zap,
  Target,
  Code2,
  FolderOpen,
  User,
  Layout,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChangeTheme: (theme: ResumeTheme) => void;
  atsScore: number;
  onOpenVersions: () => void;
  onOpenRenderCV: () => void;
  onOpenJobTailor: () => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  isLandingView: boolean;
  onToggleLandingView: () => void;
}

export const Header: React.FC<Props> = ({
  resume,
  onChangeTheme,
  atsScore,
  onOpenVersions,
  onOpenRenderCV,
  onOpenJobTailor,
  onOpenPricing,
  onOpenAuth,
  isLandingView,
  onToggleLandingView,
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between text-xs select-none">
      {/* Left: Brand & Resume Version Switcher */}
      <div className="flex items-center gap-3">
        <div
          onClick={onToggleLandingView}
          className="flex items-center gap-2 cursor-pointer group"
          title="Go to Landing Page"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-900/40">
            R
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1">
              <span>ReziCV</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                AI
              </span>
            </div>
            <div className="text-[9px] text-slate-400 font-medium -mt-0.5">RenderCV Powered</div>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-800 hidden md:block"></div>

        {!isLandingView && (
          <button
            onClick={onOpenVersions}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
          >
            <FolderOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium max-w-[120px] truncate">{resume.title}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        )}
      </div>

      {/* Center: Template Theme Selector (in Editor view) */}
      {!isLandingView && (
        <div className="hidden lg:flex items-center gap-2">
          <label className="text-slate-400 font-medium text-[11px]">Theme:</label>
          <select
            value={resume.design.theme}
            onChange={(e) => onChangeTheme(e.target.value as ResumeTheme)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="classic">RenderCV Classic</option>
            <option value="sb2nov">SB2Nov (Jake’s Resume)</option>
            <option value="moderncv">ModernCV Accent</option>
            <option value="engineeringresumes">Engineering Matrix</option>
            <option value="minimalist">Minimalist</option>
          </select>
        </div>
      )}

      {/* Right: Actions, ATS Pill, Pro Tier, Auth */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLandingView}
          className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-medium transition"
        >
          {isLandingView ? 'Go to Editor' : 'Home'}
        </button>

        {!isLandingView && (
          <>
            <button
              onClick={onOpenRenderCV}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              title="View & Edit RenderCV YAML code"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>YAML Code</span>
            </button>

            <button
              onClick={onOpenJobTailor}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/25 transition font-medium"
            >
              <Target className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tailor to Job</span>
            </button>
          </>
        )}

        {/* Pro Pill or Upgrade Button */}
        {user?.isPro ? (
          <div className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current" />
            <span>PRO</span>
          </div>
        ) : (
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upgrade</span>
          </button>
        )}

        {/* User Profile / Auth */}
        {user ? (
          <div className="flex items-center gap-2 pl-1">
            <button
              onClick={onOpenAuth}
              className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs hover:border-slate-500"
              title={user.email}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-medium"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
