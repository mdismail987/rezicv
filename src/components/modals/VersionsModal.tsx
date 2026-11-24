import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { Copy, Plus, Trash2, X, Check, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumes: ResumeData[];
  currentResumeId: string;
  onSelectResume: (id: string) => void;
  onCreateNew: (title: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  isPro: boolean;
  onOpenPricing: () => void;
}

export const VersionsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  resumes,
  currentResumeId,
  onSelectResume,
  onCreateNew,
  onDuplicate,
  onDelete,
  isPro,
  onOpenPricing,
}) => {
  const [newTitle, setNewTitle] = useState<string>('');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!isPro && resumes.length >= 1) {
      onOpenPricing();
      return;
    }
    const title = newTitle.trim() || `Resume #${resumes.length + 1}`;
    onCreateNew(title);
    setNewTitle('');
  };

  const handleDuplicate = (id: string) => {
    if (!isPro && resumes.length >= 1) {
      onOpenPricing();
      return;
    }
    onDuplicate(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Resume Versions Manager</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free limit notice if applicable */}
        {!isPro && (
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex justify-between items-center">
            <span>Free Tier: 1 version limit ({resumes.length}/1 used)</span>
            <button onClick={onOpenPricing} className="text-emerald-400 font-bold hover:underline">
              Unlock Unlimited
            </button>
          </div>
        )}

        {/* Create New Version Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Google - SRE or Meta - Full Stack"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
          />
          <button
            onClick={handleCreate}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>

        {/* Versions List */}
        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          {resumes.map((r) => {
            const isSelected = r.id === currentResumeId;
            return (
              <div
                key={r.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  onClick={() => {
                    onSelectResume(r.id);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white">{r.title}</span>
                    {isSelected && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Theme: {r.design.theme} • Last updated: {new Date(r.updatedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDuplicate(r.id)}
                    className="p-1.5 text-slate-400 hover:text-white transition"
                    title="Duplicate Resume"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {resumes.length > 1 && (
                    <button
                      onClick={() => onDelete(r.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
