import React, { useState } from 'react';
import { ResumeData, ATSScoreDetails } from '../../types/resume';
import { BasicsSection } from './BasicsSection';
import { SummarySection } from './SummarySection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ProjectsSection } from './ProjectsSection';
import { SkillsSection } from './SkillsSection';
import { CertificationsSection } from './CertificationsSection';
import { DesignSettingsSection } from './DesignSettingsSection';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Award,
  Palette,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

interface ResumeEditorProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  atsDetails: ATSScoreDetails;
  isPro: boolean;
  onOpenPricing: () => void;
  onOpenAiRewrite: (bullet: string, expIndex: number, bulletIndex: number) => void;
}

type TabKey = 'basics' | 'summary' | 'experience' | 'education' | 'projects' | 'skills' | 'certifications' | 'design';

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  onChange,
  atsDetails,
  isPro,
  onOpenPricing,
  onOpenAiRewrite,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('basics');

  const tabs: { key: TabKey; label: string; icon: any; count?: number }[] = [
    { key: 'basics', label: 'Contact Info', icon: User },
    { key: 'summary', label: 'Summary', icon: FileText },
    { key: 'experience', label: 'Experience', icon: Briefcase, count: resume.cv.sections.experience?.length },
    { key: 'education', label: 'Education', icon: GraduationCap, count: resume.cv.sections.education?.length },
    { key: 'projects', label: 'Projects', icon: FolderGit2, count: resume.cv.sections.projects?.length },
    { key: 'skills', label: 'Skills', icon: Cpu, count: resume.cv.sections.skills?.length },
    { key: 'certifications', label: 'Certs', icon: Award, count: resume.cv.sections.certifications?.length },
    { key: 'design', label: 'Design & Theme', icon: Palette },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center gap-1 p-2 bg-slate-900 border-b border-slate-800 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ATS Warnings / Guidance Banner if score below 75 */}
      {atsDetails.suggestions.length > 0 && (
        <div className="mx-4 mt-3 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
          <div className="flex-1">
            <span className="font-semibold">ATS Optimization Tip:</span> {atsDetails.suggestions[0]}
          </div>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
        {activeTab === 'basics' && <BasicsSection resume={resume} onChange={onChange} />}
        {activeTab === 'summary' && <SummarySection resume={resume} onChange={onChange} />}
        {activeTab === 'experience' && (
          <ExperienceSection
            resume={resume}
            onChange={onChange}
            onOpenAiRewrite={onOpenAiRewrite}
          />
        )}
        {activeTab === 'education' && <EducationSection resume={resume} onChange={onChange} />}
        {activeTab === 'projects' && <ProjectsSection resume={resume} onChange={onChange} />}
        {activeTab === 'skills' && <SkillsSection resume={resume} onChange={onChange} />}
        {activeTab === 'certifications' && <CertificationsSection resume={resume} onChange={onChange} />}
        {activeTab === 'design' && (
          <DesignSettingsSection
            resume={resume}
            onChange={onChange}
            isPro={isPro}
            onOpenPricing={onOpenPricing}
          />
        )}
      </div>
    </div>
  );
};
