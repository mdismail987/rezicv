import React from 'react';
import { ResumeData, CertificationItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const CertificationsSection: React.FC<Props> = ({ resume, onChange }) => {
  const { cv } = resume;
  const certifications = cv.sections.certifications || [];

  const updateCerts = (newCerts: CertificationItem[]) => {
    onChange({
      ...resume,
      cv: {
        ...cv,
        sections: {
          ...cv.sections,
          certifications: newCerts,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const addCert = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '2023',
    };
    updateCerts([...certifications, newItem]);
  };

  const removeCert = (index: number) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    updateCerts(updated);
  };

  const updateField = (index: number, field: keyof CertificationItem, value: string) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateCerts(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-400">Add relevant industry certifications and licenses.</p>
        <button
          onClick={addCert}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-3">
        {certifications.map((cert, idx) => (
          <div key={cert.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl items-center">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Certification Name</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateField(idx, 'name', e.target.value)}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Issuer</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateField(idx, 'issuer', e.target.value)}
                placeholder="e.g. Amazon Web Services"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Year</label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateField(idx, 'date', e.target.value)}
                  placeholder="2023"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <button
                onClick={() => removeCert(idx)}
                className="mt-5 text-slate-500 hover:text-rose-400 p-1.5 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
