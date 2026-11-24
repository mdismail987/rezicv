import React, { useState } from 'react';
import { ResumeData, JobMatchResult } from '../../types/resume';
import { tailorToJobDescription } from '../../services/aiService';
import { Sparkles, X, Check, Target, RefreshCw, Plus, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onApplyTailoring: (newSummary: string, newBullets: string[]) => void;
}

export const JobTailorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  resume,
  onApplyTailoring,
}) => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    try {
      const matchResult = await tailorToJobDescription(jobDescription, resume);
      setResult(matchResult);
    } catch (err) {
      // Handled
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApply = () => {
    if (!result) return;
    const bullets = result.tailoredBullets.map((b) => b.suggestedBullet);
    onApplyTailoring(result.tailoredSummary, bullets);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 max-h-[90vh] flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Target Job Description & ATS Tailoring</h3>
              <p className="text-[11px] text-slate-400">Match your resume to the exact keywords of any job posting.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
          {!result ? (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-300">
                Paste the Job Description (Requirements, Qualifications, Stack):
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={9}
                placeholder="Paste the job posting here (e.g., We are looking for a Senior Full Stack Engineer with 5+ years experience in React, TypeScript, Go, AWS, Microservices...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-indigo-500 font-sans"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Keywords & Match Score...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Scan Keywords & Tailor Resume</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Match Score Card */}
              <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Job Target</div>
                  <div className="text-sm font-bold text-white">{result.jobTitle}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">ATS Keyword Match</div>
                  <div
                    className={`text-xl font-black ${
                      result.matchScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {result.matchScore}%
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Keywords Found ({result.matchedKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.map((kw, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                    <span>⚠️ Missing In Resume ({result.missingKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tailored Professional Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ✨ Tailored Professional Summary:
                </label>
                <div className="p-3 bg-indigo-950/20 border border-indigo-500/30 rounded-xl text-xs text-slate-200 leading-relaxed">
                  {result.tailoredSummary}
                </div>
              </div>

              {/* Tailored Bullets */}
              {result.tailoredBullets.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ✨ Suggested High-Match Bullets to Add:
                  </label>
                  <div className="space-y-2">
                    {result.tailoredBullets.map((b, i) => (
                      <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">
                          Incorporates: {b.targetKeyword}
                        </span>
                        {b.suggestedBullet}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {result && (
          <div className="flex justify-between items-center pt-3 border-t border-slate-800">
            <button
              onClick={() => setResult(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Scan Another Job
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Tailored Content</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
