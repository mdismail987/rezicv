import React from 'react';
import { ResumeData } from '../../types/resume';
import { User, Mail, Phone, MapPin, Globe, Plus, Trash2 } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const BasicsSection: React.FC<Props> = ({ resume, onChange }) => {
  const { cv } = resume;

  const updateCv = (fields: Partial<typeof cv>) => {
    onChange({
      ...resume,
      cv: { ...cv, ...fields },
      updatedAt: new Date().toISOString(),
    });
  };

  const addSocial = () => {
    const networks = cv.social_networks || [];
    updateCv({
      social_networks: [...networks, { network: 'LinkedIn', username: '' }],
    });
  };

  const removeSocial = (index: number) => {
    const networks = [...(cv.social_networks || [])];
    networks.splice(index, 1);
    updateCv({ social_networks: networks });
  };

  const updateSocial = (index: number, field: 'network' | 'username', value: string) => {
    const networks = [...(cv.social_networks || [])];
    networks[index] = { ...networks[index], [field]: value };
    updateCv({ social_networks: networks });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Full Name *</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={cv.name}
              onChange={(e) => updateCv({ name: e.target.value })}
              placeholder="e.g. Alexander Mitchell"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Target Job Title / Headline</label>
          <input
            type="text"
            value={cv.headline}
            onChange={(e) => updateCv({ headline: e.target.value })}
            placeholder="e.g. Senior Full Stack Software Engineer"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input
              type="email"
              value={cv.email}
              onChange={(e) => updateCv({ email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={cv.phone}
              onChange={(e) => updateCv({ phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Location (City, State/Country)</label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={cv.location}
              onChange={(e) => updateCv({ location: e.target.value })}
              placeholder="San Francisco, CA"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Portfolio / Personal Website</label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={cv.website}
              onChange={(e) => updateCv({ website: e.target.value })}
              placeholder="https://yourdomain.dev"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Social Networks (LinkedIn, GitHub) */}
      <div className="pt-2">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-medium text-slate-300">Social Links & Profiles</label>
          <button
            onClick={addSocial}
            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition"
          >
            <Plus className="w-3 h-3" /> Add Profile
          </button>
        </div>

        <div className="space-y-2">
          {cv.social_networks?.map((soc, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={soc.network}
                onChange={(e) => updateSocial(idx, 'network', e.target.value)}
                placeholder="Platform (e.g. LinkedIn)"
                className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                value={soc.username}
                onChange={(e) => updateSocial(idx, 'username', e.target.value)}
                placeholder="handle or username"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <button
                onClick={() => removeSocial(idx)}
                className="p-1.5 text-slate-500 hover:text-rose-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
