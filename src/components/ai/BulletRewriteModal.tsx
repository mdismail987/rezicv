import React, { useState } from 'react';
import { rewriteBulletPoint, RewriteMode } from '../../services/aiService';
import { Sparkles, Check, Copy, X, RefreshCw, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  originalBullet: string;
  onApply: (newBullet: string) => void;
}

export const BulletRewriteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  originalBullet,
  onApply,
}) => {
  const [mode, setMode] = useState<RewriteMode>('impact');
  const [rewrittenBullet, setRewrittenBullet] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRewrite = async (selectedMode: RewriteMode) => {
    setMode(selectedMode);
    setIsLoading(true);
    try {
      const result = await rewriteBulletPoint(originalBullet, selectedMode);
      setRewrittenBullet(result.rewrittenBullet);
      setExplanation(result.explanation);
    } catch (err) {
      // Handled by service
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenBullet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modes: { id: RewriteMode; label: string; desc: string }[] = [
    { id: 'impact', label: 'STAR Impact', desc: 'Action Verb + Context + Result' },
    { id: 'metrics', label: 'Add Metrics', desc: 'Quantify with % or $' },
    { id: 'leadership', label: 'Executive Tone', desc: 'Ownership & Strategy' },
    { id: 'concise', label: 'Concise & Punchy', desc: 'Trim filler words' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Bullet Point Enhancer</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Original Bullet */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Original Bullet:</label>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
            {originalBullet || 'No bullet text provided.'}
          </div>
        </div>

        {/* Mode Selector */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5">Choose Rewrite Style:</label>
          <div className="grid grid-cols-2 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => handleRewrite(m.id)}
                className={`p-2.5 rounded-xl border text-left transition ${
                  mode === m.id
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-semibold">{m.label}</div>
                <div className="text-[10px] text-slate-400">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Output */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6 gap-2 text-slate-400 text-xs">
            <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
            <span>Generating high-impact phrasing...</span>
          </div>
        ) : rewrittenBullet ? (
          <div className="space-y-2">
            <label className="block text-[11px] font-medium text-emerald-400">✨ AI Suggestion:</label>
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-slate-100 leading-relaxed font-medium">
              {rewrittenBullet}
            </div>
            {explanation && (
              <p className="text-[10px] text-slate-400 italic">💡 {explanation}</p>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <button
              onClick={() => handleRewrite('impact')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              Generate Rewrite
            </button>
          </div>
        )}

        {/* Footer Actions */}
        {rewrittenBullet && (
          <div className="flex justify-end items-center gap-2 pt-3 border-t border-slate-800">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={() => {
                onApply(rewrittenBullet);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply to Resume</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
