export type ResumeTheme = 
  | 'classic'
  | 'sb2nov'
  | 'moderncv'
  | 'engineeringresumes'
  | 'minimalist';

export interface SocialNetwork {
  network: string; // 'LinkedIn' | 'GitHub' | 'Twitter' | 'Portfolio' | string;
  username: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  area: string;
  degree: string;
  start_date: string;
  end_date: string;
  highlights?: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description?: string;
  url?: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  name: string; // e.g. "Languages", "Frameworks & Tools", "Databases"
  details: string; // Comma-separated list or tags
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeDesign {
  theme: ResumeTheme;
  font_family: 'sans' | 'serif' | 'mono';
  font_size: '9pt' | '10pt' | '11pt' | '12pt';
  page_size: 'letter' | 'a4';
  primary_color: string;
  margins: '0.5in' | '0.75in' | '1.0in';
}

export interface ResumeData {
  id: string;
  title: string; // e.g. "Software Engineer - Google"
  updatedAt: string;
  cv: {
    name: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    social_networks: SocialNetwork[];
    sections: {
      summary: string;
      experience: ExperienceItem[];
      education: EducationItem[];
      projects: ProjectItem[];
      skills: SkillCategory[];
      certifications: CertificationItem[];
    };
  };
  design: ResumeDesign;
}

export interface ATSScoreDetails {
  totalScore: number;
  contactScore: number;
  summaryScore: number;
  experienceScore: number;
  skillsScore: number;
  formattingScore: number;
  actionVerbsCount: number;
  metricsCount: number;
  bulletCount: number;
  suggestions: string[];
  missingCriticalFields: string[];
}

export interface JobMatchResult {
  matchScore: number;
  jobTitle: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  tailoredBullets: {
    originalBullet?: string;
    suggestedBullet: string;
    targetKeyword: string;
  }[];
  tailoredSummary: string;
}

export interface UserProfile {
  email: string;
  name: string;
  isPro: boolean;
  stripeCustomerId?: string;
  plan: 'free' | 'pro';
}
