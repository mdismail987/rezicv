import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { Sparkles, Check, RefreshCw } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const SummarySection: React.FC<Props> = ({ resume, onChange }) => {
  const { cv } = resume;
  const [isGenerating, setIsGenerating] = useState(false);

  const updateSummary = (summaryText: string) => {
    onChange({
      ...resume,
      cv: {
        ...cv,
        sections: {
          ...cv.sections,
          summary: summaryText,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const handleAiPolish = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const polished = `Results-driven ${cv.headline || 'Software Engineer'} with deep expertise in scalable architecture and high-reliability systems. Demonstrated track record of optimizing application performance, accelerating product velocity, and leading high-impact cross-functional initiatives. Passionate about engineering excellence, test-driven craftsmanship, and delivering measurable business outcomes.`;
      updateSummary(polished);
      setIsGenerating(false);
    }, 400);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-slate-400">
          Professional Summary (2-4 sentences recommended for ATS)
        </label>
        <button
          onClick={handleAiPolish}
          disabled={isGenerating}
          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition"
        >
          {isGenerating ? (
            <RefreshCw className="w-3 h-3 animate-spin" />
          ) : (
            <Sparkles className="w-3 h-3" />
          )}
          <span>{isGenerating ? 'Polishing...' : '✨ AI Polish Summary'}</span>
        </button>
      </div>

      <textarea
        value={cv.sections.summary || ''}
        onChange={(e) => updateSummary(e.target.value)}
        rows={4}
        placeholder="Briefly state your core role, years of experience, top 2-3 superpowers, and a quantified career highlight..."
        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 leading-relaxed focus:outline-none focus:border-emerald-500"
      />

      <div className="flex justify-between text-[11px] text-slate-500">
        <span>Word count: {(cv.sections.summary || '').split(/\s+/).filter(Boolean).length}</span>
        <span>Target: 40–80 words</span>
      </div>
    </div>
  );
};
