import React from 'react';
import { ResumeData, SkillCategory } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const SkillsSection: React.FC<Props> = ({ resume, onChange }) => {
  const { cv } = resume;
  const skills = cv.sections.skills || [];

  const updateSkills = (newSkills: SkillCategory[]) => {
    onChange({
      ...resume,
      cv: {
        ...cv,
        sections: {
          ...cv.sections,
          skills: newSkills,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const addCategory = () => {
    const newItem: SkillCategory = {
      id: `skill-${Date.now()}`,
      name: 'Category Name',
      details: 'Skill 1, Skill 2, Skill 3',
    };
    updateSkills([...skills, newItem]);
  };

  const removeCategory = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    updateSkills(updated);
  };

  const updateCategory = (index: number, field: 'name' | 'details', value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    updateSkills(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-400">
          Categorize your skills. Recruiters and ATS match resumes by keyword matches.
        </p>
        <button
          onClick={addCategory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Skill Category</span>
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((skill, idx) => (
          <div key={skill.id} className="flex items-start gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="w-1/3">
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Category</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateCategory(idx, 'name', e.target.value)}
                placeholder="e.g. Languages"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Skills (comma-separated)</label>
              <input
                type="text"
                value={skill.details}
                onChange={(e) => updateCategory(idx, 'details', e.target.value)}
                placeholder="TypeScript, Python, Go, SQL"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <button
              onClick={() => removeCategory(idx)}
              className="mt-6 text-slate-500 hover:text-rose-400 p-1.5 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
