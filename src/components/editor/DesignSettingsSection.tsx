import React from 'react';
import { ResumeData, ResumeDesign, ResumeTheme } from '../../types/resume';
import { Layout, Palette, FileText, Check } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  isPro: boolean;
  onOpenPricing: () => void;
}

const THEMES: { id: ResumeTheme; name: string; description: string; isProOnly: boolean }[] = [
  {
    id: 'classic',
    name: 'RenderCV Classic',
    description: 'Harvard/Columbia standard with clean horizontal dividers. Universally praised by recruiters.',
    isProOnly: false,
  },
  {
    id: 'sb2nov',
    name: 'SB2Nov (Jake’s Resume)',
    description: 'The #1 resume layout on Reddit r/EngineeringResumes. Highest density & 99% ATS pass rate.',
    isProOnly: false,
  },
  {
    id: 'moderncv',
    name: 'ModernCV Accent',
    description: 'Contemporary header with subtle color-accented dividers.',
    isProOnly: true,
  },
  {
    id: 'engineeringresumes',
    name: 'Engineering Matrix',
    description: 'Skills-first matrix with monospace accents for engineers and DevOps professionals.',
    isProOnly: true,
  },
  {
    id: 'minimalist',
    name: 'Executive Minimalist',
    description: 'Generous whitespace and refined typography for leadership & staff roles.',
    isProOnly: true,
  },
];

export const DesignSettingsSection: React.FC<Props> = ({
  resume,
  onChange,
  isPro,
  onOpenPricing,
}) => {
  const { design } = resume;

  const updateDesign = (partial: Partial<ResumeDesign>) => {
    onChange({
      ...resume,
      design: { ...design, ...partial },
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSelectTheme = (theme: ResumeTheme, isProOnly: boolean) => {
    if (isProOnly && !isPro) {
      onOpenPricing();
      return;
    }
    updateDesign({ theme });
  };

  return (
    <div className="space-y-6">
      {/* Template Theme Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          ATS Template Theme (Inspired by RenderCV)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {THEMES.map((theme) => {
            const isSelected = design.theme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id, theme.isProOnly)}
                className={`p-3.5 rounded-xl border cursor-pointer transition relative ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {theme.name}
                    {theme.isProOnly && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold uppercase">
                        PRO
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{theme.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography & Sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Font Family</label>
          <select
            value={design.font_family}
            onChange={(e) => updateDesign({ font_family: e.target.value as any })}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
          >
            <option value="sans">Inter (Modern Sans-Serif)</option>
            <option value="serif">Merriweather / Georgia (Classic Serif)</option>
            <option value="mono">JetBrains Mono (Tech Monospace)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Font Size</label>
          <select
            value={design.font_size}
            onChange={(e) => updateDesign({ font_size: e.target.value as any })}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
          >
            <option value="9pt">9pt (Ultra High Density)</option>
            <option value="10pt">10pt (Standard ATS Recommended)</option>
            <option value="11pt">11pt (Relaxed)</option>
            <option value="12pt">12pt (Spacious)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Paper Size</label>
          <select
            value={design.page_size}
            onChange={(e) => updateDesign({ page_size: e.target.value as any })}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
          >
            <option value="letter">US Letter (8.5 × 11 in)</option>
            <option value="a4">A4 (210 × 297 mm)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
