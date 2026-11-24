import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { exportToRenderCVYaml, importFromRenderCVYaml } from '../../utils/rendercv';
import { Code2, Copy, Check, Download, Upload, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onImport: (imported: ResumeData) => void;
}

export const RenderCVModal: React.FC<Props> = ({ isOpen, onClose, resume, onImport }) => {
  const [yamlCode, setYamlCode] = useState<string>(() => exportToRenderCVYaml(resume));
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([yamlCode], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.cv.name.replace(/\s+/g, '_')}_rendercv.yaml`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyChanges = () => {
    try {
      setError(null);
      const parsed = importFromRenderCVYaml(yamlCode, resume.id);
      onImport(parsed);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid RenderCV YAML syntax.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col max-h-[90vh] space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">RenderCV YAML Code & Interoperability</h3>
              <p className="text-[11px] text-slate-400">
                100% compliant with open-source RenderCV CLI and schema.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Code Editor */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <textarea
            value={yamlCode}
            onChange={(e) => setYamlCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500 custom-scrollbar leading-relaxed"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied YAML!' : 'Copy YAML'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .yaml</span>
            </button>
          </div>

          <button
            onClick={handleApplyChanges}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply YAML to Editor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
