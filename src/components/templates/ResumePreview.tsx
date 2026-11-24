import React, { useRef, useState } from 'react';
import { ResumeData } from '../../types/resume';
import { ClassicTemplate } from './ClassicTemplate';
import { SB2NovTemplate } from './SB2NovTemplate';
import { ModernCVTemplate } from './ModernCVTemplate';
import { EngineeringTemplate } from './EngineeringTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { Printer, Download, ZoomIn, ZoomOut, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  atsScore: number;
  onOpenJobTailor: () => void;
  onExportYaml: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  atsScore,
  onOpenJobTailor,
  onExportYaml,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (resume.design.theme) {
      case 'sb2nov':
        return <SB2NovTemplate resume={resume} />;
      case 'moderncv':
        return <ModernCVTemplate resume={resume} />;
      case 'engineeringresumes':
        return <EngineeringTemplate resume={resume} />;
      case 'minimalist':
        return <MinimalistTemplate resume={resume} />;
      case 'classic':
      default:
        return <ClassicTemplate resume={resume} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800">
      {/* Top Preview Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-950/80 backdrop-blur border-b border-slate-800 text-xs">
        {/* ATS Score pill */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold border ${
              atsScore >= 80
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : atsScore >= 60
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ATS Score: {atsScore}/100</span>
          </div>

          <button
            onClick={onOpenJobTailor}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor to Job</span>
          </button>
        </div>

        {/* Controls: Zoom, Print / PDF */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoom((z) => Math.max(60, z - 10))}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 w-9 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(140, z + 10))}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1"></div>

          <button
            onClick={onExportYaml}
            className="px-2.5 py-1 text-slate-300 hover:text-white rounded border border-slate-700 hover:bg-slate-800 transition text-[11px] font-medium"
            title="Export RenderCV YAML Code"
          >
            RenderCV YAML
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Sheet Canvas with realistic Paper Drop Shadow */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start bg-slate-900/60 custom-scrollbar">
        <div
          ref={printRef}
          id="printable-resume-container"
          className="print-container transition-transform duration-150 origin-top shadow-2xl rounded-sm overflow-hidden"
          style={{
            transform: `scale(${zoom / 100})`,
            width: resume.design.page_size === 'a4' ? '210mm' : '8.5in',
            minHeight: resume.design.page_size === 'a4' ? '297mm' : '11in',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
