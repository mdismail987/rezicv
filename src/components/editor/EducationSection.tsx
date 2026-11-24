import React from 'react';
import { ResumeData, EducationItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const EducationSection: React.FC<Props> = ({ resume, onChange }) => {
  const { cv } = resume;
  const education = cv.sections.education || [];

  const updateEducation = (newEdu: EducationItem[]) => {
    onChange({
      ...resume,
      cv: {
        ...cv,
        sections: {
          ...cv.sections,
          education: newEdu,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const addEdu = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      area: 'Computer Science',
      degree: 'B.S.',
      start_date: '2018',
      end_date: '2022',
      highlights: ['GPA: 3.8 / 4.0'],
    };
    updateEducation([newItem, ...education]);
  };

  const removeEdu = (index: number) => {
    const updated = [...education];
    updated.splice(index, 1);
    updateEducation(updated);
  };

  const updateField = (index: number, field: keyof EducationItem, value: any) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    updateEducation(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-400">Add degrees, university programs, or diplomas.</p>
        <button
          onClick={addEdu}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={edu.id} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-200">
                {edu.institution || `School #${idx + 1}`}
              </span>
              <button
                onClick={() => removeEdu(idx)}
                className="text-slate-500 hover:text-rose-400 p-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">University / College *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateField(idx, 'institution', e.target.value)}
                  placeholder="e.g. UC Berkeley, MIT, Stanford"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Degree & Major *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateField(idx, 'degree', e.target.value)}
                    placeholder="B.S. / M.S."
                    className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={edu.area}
                    onChange={(e) => updateField(idx, 'area', e.target.value)}
                    placeholder="Computer Science"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Start Date</label>
                <input
                  type="text"
                  value={edu.start_date}
                  onChange={(e) => updateField(idx, 'start_date', e.target.value)}
                  placeholder="e.g. 2018"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">End Date (or expected)</label>
                <input
                  type="text"
                  value={edu.end_date}
                  onChange={(e) => updateField(idx, 'end_date', e.target.value)}
                  placeholder="e.g. 2022"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Honors / GPA / Key Highlights</label>
              <input
                type="text"
                value={(edu.highlights || []).join('; ')}
                onChange={(e) => updateField(idx, 'highlights', e.target.value.split(';').map((s) => s.trim()).filter(Boolean))}
                placeholder="e.g. Cumulative GPA: 3.8 / 4.0; Dean's Honor List"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
