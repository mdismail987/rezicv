import React from 'react';
import { ResumeData, ProjectItem } from '../../types/resume';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const ProjectsSection: React.FC<Props> = ({ resume, onChange }) => {
  const { cv } = resume;
  const projects = cv.sections.projects || [];

  const updateProjects = (newProjects: ProjectItem[]) => {
    onChange({
      ...resume,
      cv: {
        ...cv,
        sections: {
          ...cv.sections,
          projects: newProjects,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      url: '',
      highlights: ['Engineered core system using modern tech stack, serving active users.'],
    };
    updateProjects([newItem, ...projects]);
  };

  const removeProject = (index: number) => {
    const updated = [...projects];
    updated.splice(index, 1);
    updateProjects(updated);
  };

  const updateField = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    updateProjects(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-400">Showcase open source, side projects, or impactful systems.</p>
        <button
          onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div key={proj.id} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-200">
                {proj.name || `Project #${idx + 1}`}
              </span>
              <button
                onClick={() => removeProject(idx)}
                className="text-slate-500 hover:text-rose-400 p-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Project Name *</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateField(idx, 'name', e.target.value)}
                  placeholder="e.g. Distributed KV-Store"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Project URL / Repository</label>
                <input
                  type="text"
                  value={proj.url || ''}
                  onChange={(e) => updateField(idx, 'url', e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Tech Stack / Short Summary</label>
                <input
                  type="text"
                  value={proj.description || ''}
                  onChange={(e) => updateField(idx, 'description', e.target.value)}
                  placeholder="e.g. Go, Raft Consensus, Docker, Prometheus"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Highlights (Bullets)</label>
              <textarea
                value={(proj.highlights || []).join('\n')}
                onChange={(e) => updateField(idx, 'highlights', e.target.value.split('\n'))}
                rows={2}
                placeholder="One bullet per line..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
