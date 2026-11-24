import React, { useState, useEffect } from 'react';
import { initialResumeData } from './data/sampleResume';
import { ResumeData, ResumeTheme } from './types/resume';
import { calculateATSScore } from './utils/atsScorer';
import { exportToRenderCVYaml } from './utils/rendercv';
import { useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { LandingPage } from './components/landing/LandingPage';
import { ResumeEditor } from './components/editor/ResumeEditor';
import { ResumePreview } from './components/templates/ResumePreview';
import { AuthModal } from './components/modals/AuthModal';
import { PricingModal } from './components/modals/PricingModal';
import { VersionsModal } from './components/modals/VersionsModal';
import { RenderCVModal } from './components/modals/RenderCVModal';
import { BulletRewriteModal } from './components/ai/BulletRewriteModal';
import { JobTailorModal } from './components/ai/JobTailorModal';

const RESUMES_STORAGE_KEY = 'rezicv_resumes_collection';
const CURRENT_ID_KEY = 'rezicv_current_resume_id';

export const App: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'editor' | 'landing'>('editor');

  // Multi-version Resumes State
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    try {
      const saved = localStorage.getItem(RESUMES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return [initialResumeData];
  });

  const [currentId, setCurrentId] = useState<string>(() => {
    const saved = localStorage.getItem(CURRENT_ID_KEY);
    return saved || initialResumeData.id;
  });

  // Active Resume
  const currentResume = resumes.find((r) => r.id === currentId) || resumes[0] || initialResumeData;

  // Real-time ATS Scorer
  const atsDetails = calculateATSScore(currentResume);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    localStorage.setItem(CURRENT_ID_KEY, currentId);
  }, [currentId]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isVersionsOpen, setIsVersionsOpen] = useState(false);
  const [isRenderCVOpen, setIsRenderCVOpen] = useState(false);
  const [isJobTailorOpen, setIsJobTailorOpen] = useState(false);

  // AI Bullet Rewrite modal state
  const [rewriteState, setRewriteState] = useState<{
    isOpen: boolean;
    bullet: string;
    expIndex: number;
    bulletIndex: number;
  }>({
    isOpen: false,
    bullet: '',
    expIndex: 0,
    bulletIndex: 0,
  });

  // Handlers for resume updates
  const handleUpdateResume = (updated: ResumeData) => {
    setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleChangeTheme = (theme: ResumeTheme) => {
    handleUpdateResume({
      ...currentResume,
      design: { ...currentResume.design, theme },
      updatedAt: new Date().toISOString(),
    });
  };

  const handleCreateNewResume = (title: string) => {
    const newResume: ResumeData = {
      ...initialResumeData,
      id: `resume-${Date.now()}`,
      title,
      updatedAt: new Date().toISOString(),
    };
    setResumes((prev) => [newResume, ...prev]);
    setCurrentId(newResume.id);
  };

  const handleDuplicateResume = (id: string) => {
    const source = resumes.find((r) => r.id === id) || currentResume;
    const duplicated: ResumeData = {
      ...source,
      id: `resume-${Date.now()}`,
      title: `${source.title} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    setResumes((prev) => [duplicated, ...prev]);
    setCurrentId(duplicated.id);
  };

  const handleDeleteResume = (id: string) => {
    if (resumes.length <= 1) return;
    const remaining = resumes.filter((r) => r.id !== id);
    setResumes(remaining);
    if (currentId === id) {
      setCurrentId(remaining[0].id);
    }
  };

  // AI Rewrite Handler
  const handleOpenAiRewrite = (bullet: string, expIndex: number, bulletIndex: number) => {
    setRewriteState({
      isOpen: true,
      bullet,
      expIndex,
      bulletIndex,
    });
  };

  const handleApplyAiRewrite = (newBullet: string) => {
    const experiences = [...currentResume.cv.sections.experience];
    const targetExp = { ...experiences[rewriteState.expIndex] };
    const highlights = [...targetExp.highlights];
    highlights[rewriteState.bulletIndex] = newBullet;
    targetExp.highlights = highlights;
    experiences[rewriteState.expIndex] = targetExp;

    handleUpdateResume({
      ...currentResume,
      cv: {
        ...currentResume.cv,
        sections: {
          ...currentResume.cv.sections,
          experience: experiences,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  // Job Tailoring Apply Handler
  const handleApplyJobTailoring = (newSummary: string, newBullets: string[]) => {
    const experiences = [...currentResume.cv.sections.experience];
    if (experiences.length > 0) {
      const firstExp = { ...experiences[0] };
      firstExp.highlights = [...newBullets, ...firstExp.highlights];
      experiences[0] = firstExp;
    }

    handleUpdateResume({
      ...currentResume,
      cv: {
        ...currentResume.cv,
        sections: {
          ...currentResume.cv.sections,
          summary: newSummary,
          experience: experiences,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      {/* Universal Header */}
      <Header
        resume={currentResume}
        onChangeTheme={handleChangeTheme}
        atsScore={atsDetails.totalScore}
        onOpenVersions={() => setIsVersionsOpen(true)}
        onOpenRenderCV={() => setIsRenderCVOpen(true)}
        onOpenJobTailor={() => setIsJobTailorOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLandingView={viewMode === 'landing'}
        onToggleLandingView={() => setViewMode((m) => (m === 'landing' ? 'editor' : 'landing'))}
      />

      {/* Main Body View */}
      {viewMode === 'landing' ? (
        <LandingPage
          onStartBuilding={() => setViewMode('editor')}
          onOpenPricing={() => setIsPricingOpen(true)}
        />
      ) : (
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Column: Guided Form Editor */}
          <div
            id="app-editor-pane"
            className="w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-3.5rem)] flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800"
          >
            <ResumeEditor
              resume={currentResume}
              onChange={handleUpdateResume}
              atsDetails={atsDetails}
              isPro={user?.isPro || false}
              onOpenPricing={() => setIsPricingOpen(true)}
              onOpenAiRewrite={handleOpenAiRewrite}
            />
          </div>

          {/* Right Column: Live Printable ATS Preview */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-3.5rem)] flex flex-col">
            <ResumePreview
              resume={currentResume}
              atsScore={atsDetails.totalScore}
              onOpenJobTailor={() => setIsJobTailorOpen(true)}
              onExportYaml={() => setIsRenderCVOpen(true)}
            />
          </div>
        </main>
      )}

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

      <VersionsModal
        isOpen={isVersionsOpen}
        onClose={() => setIsVersionsOpen(false)}
        resumes={resumes}
        currentResumeId={currentId}
        onSelectResume={(id) => setCurrentId(id)}
        onCreateNew={handleCreateNewResume}
        onDuplicate={handleDuplicateResume}
        onDelete={handleDeleteResume}
        isPro={user?.isPro || false}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <RenderCVModal
        isOpen={isRenderCVOpen}
        onClose={() => setIsRenderCVOpen(false)}
        resume={currentResume}
        onImport={handleUpdateResume}
      />

      <BulletRewriteModal
        isOpen={rewriteState.isOpen}
        onClose={() => setRewriteState({ ...rewriteState, isOpen: false })}
        originalBullet={rewriteState.bullet}
        onApply={handleApplyAiRewrite}
      />

      <JobTailorModal
        isOpen={isJobTailorOpen}
        onClose={() => setIsJobTailorOpen(false)}
        resume={currentResume}
        onApplyTailoring={handleApplyJobTailoring}
      />
    </div>
  );
};
