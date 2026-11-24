import React, { useState } from 'react';
import { ResumeData, ExperienceItem } from '../../types/resume';
import { Plus, Trash2, Sparkles, GripVertical } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenAiRewrite: (bullet: string, expIndex: number, bulletIndex: number) => void;
}

export const ExperienceSection: React.FC<Props> = ({ resume, onChange, onOpenAiRewrite }) => {
  const { cv } = resume;
  const experiences = cv.sections.experience || [];

  const updateExperiences = (newExps: ExperienceItem[]) => {
    onChange({
      ...resume,
      cv: {
        ...cv,
        sections: {
          ...cv.sections,
          experience: newExps,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      start_date: '2023-01',
      end_date: 'Present',
      highlights: ['Engineered scalable features driving positive user engagement and performance.'],
    };
    updateExperiences([newItem, ...experiences]);
  };

  const removeExperience = (index: number) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    updateExperiences(updated);
  };

  const updateField = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    updateExperiences(updated);
  };

  const addBullet = (expIndex: number) => {
    const updated = [...experiences];
    const highlights = [...(updated[expIndex].highlights || []), ''];
    updated[expIndex] = { ...updated[expIndex], highlights };
    updateExperiences(updated);
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...experiences];
    const highlights = [...updated[expIndex].highlights];
    highlights.splice(bulletIndex, 1);
    updated[expIndex] = { ...updated[expIndex], highlights };
    updateExperiences(updated);
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const updated = [...experiences];
    const highlights = [...updated[expIndex].highlights];
    highlights[bulletIndex] = value;
    updated[expIndex] = { ...updated[expIndex], highlights };
    updateExperiences(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-400">
          List your past roles in reverse chronological order. Use action verbs and quantifiable results.
        </p>
        <button
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, expIdx) => (
          <div
            key={exp.id}
            className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3 relative group"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-200">
                {exp.company || exp.position ? `${exp.position || 'Role'} at ${exp.company || 'Company'}` : `Position #${expIdx + 1}`}
              </span>
              <button
                onClick={() => removeExperience(expIdx)}
                className="text-slate-500 hover:text-rose-400 p-1 transition"
                title="Remove Position"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateField(expIdx, 'company', e.target.value)}
                  placeholder="e.g. Stripe, Google, Acme Corp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateField(expIdx, 'position', e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.start_date}
                  onChange={(e) => updateField(expIdx, 'start_date', e.target.value)}
                  placeholder="e.g. 2021-03 or Mar 2021"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">End Date</label>
                <input
                  type="text"
                  value={exp.end_date}
                  onChange={(e) => updateField(expIdx, 'end_date', e.target.value)}
                  placeholder="e.g. Present or 2023-11"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-medium text-slate-400">
                  Key Achievements & Responsibilities (RenderCV Highlights)
                </label>
                <button
                  onClick={() => addBullet(expIdx)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Bullet
                </button>
              </div>

              <div className="space-y-2">
                {exp.highlights?.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-1.5">
                    <span className="text-slate-500 text-xs mt-2 select-none">•</span>
                    <textarea
                      value={bullet}
                      onChange={(e) => updateBullet(expIdx, bIdx, e.target.value)}
                      rows={2}
                      placeholder="Start with an action verb (e.g. Architected, Reduced, Accelerated)..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-snug"
                    />
                    <div className="flex flex-col gap-1 pt-0.5">
                      <button
                        onClick={() => onOpenAiRewrite(bullet, expIdx, bIdx)}
                        className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/25 border border-indigo-500/30 transition text-[11px]"
                        title="AI Rewrite & Polish"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeBullet(expIdx, bIdx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                        title="Delete Bullet"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
