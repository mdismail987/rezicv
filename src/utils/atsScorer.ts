import { ResumeData, ATSScoreDetails } from '../types/resume';

const STRONG_ACTION_VERBS = new Set([
  'architected', 'accelerated', 'authored', 'automated', 'benchmarked', 'built',
  'championed', 'consolidated', 'created', 'cut', 'decreased', 'delivered',
  'deployed', 'designed', 'developed', 'directed', 'eliminated', 'engineered',
  'established', 'expanded', 'expedited', 'formulated', 'generated', 'guided',
  'implemented', 'improved', 'increased', 'initiated', 'instituted', 'launched',
  'led', 'maximized', 'mentored', 'minimized', 'modernized', 'negotiated',
  'orchestrated', 'optimized', 'overhauled', 'pioneered', 'reduced', 'refactored',
  'resolved', 'revamped', 'scaled', 'slashed', 'spearheaded', 'standardized',
  'streamlined', 'strengthened', 'surpassed', 'transformed', 'upgraded'
]);

const METRIC_REGEX = /\b(\d+(\.\d+)?%|\$\d+(\.\d+)?[kKmMbB]?|\d+[kKmMbB]?\+?|\d+\s*(users|clients|requests|transactions|teams|engineers|days|hours|minutes|seconds))\b/i;

export function calculateATSScore(resume: ResumeData): ATSScoreDetails {
  const suggestions: string[] = [];
  const missingCriticalFields: string[] = [];

  // 1. Contact Info Scoring (Max 20 pts)
  let contactScore = 0;
  if (resume.cv.name?.trim()) contactScore += 5;
  else missingCriticalFields.push('Full Name');

  if (resume.cv.email?.trim() && resume.cv.email.includes('@')) contactScore += 5;
  else missingCriticalFields.push('Valid Email Address');

  if (resume.cv.phone?.trim()) contactScore += 3;
  else suggestions.push('Add a contact phone number with country/area code.');

  if (resume.cv.location?.trim()) contactScore += 3;
  else suggestions.push('Include a location (City, State / Country) for ATS regional indexing.');

  if (resume.cv.social_networks && resume.cv.social_networks.length > 0) contactScore += 4;
  else suggestions.push('Add a LinkedIn or GitHub profile link for technical credibility.');

  // 2. Summary Scoring (Max 15 pts)
  let summaryScore = 0;
  const summary = resume.cv.sections.summary?.trim() || '';
  if (summary.length > 50) {
    summaryScore += 10;
    if (summary.length >= 120 && summary.length <= 400) {
      summaryScore += 5; // Ideal length
    } else if (summary.length > 400) {
      suggestions.push('Professional summary is slightly long; keep it between 2-4 punchy sentences.');
    }
  } else {
    suggestions.push('Add a compelling professional summary (2-3 sentences) highlighting core impact.');
  }

  // 3. Experience & Bullet Point Quality (Max 35 pts)
  let experienceScore = 0;
  let totalBullets = 0;
  let actionVerbsFound = 0;
  let metricsFound = 0;

  const experiences = resume.cv.sections.experience || [];
  if (experiences.length === 0) {
    missingCriticalFields.push('At least one Work Experience entry');
  } else {
    experienceScore += 10; // Has experience section

    experiences.forEach((exp) => {
      (exp.highlights || []).forEach((bullet) => {
        const text = bullet.trim();
        if (!text) return;
        totalBullets++;

        // Check first word for strong action verb
        const firstWord = text.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
        if (STRONG_ACTION_VERBS.has(firstWord)) {
          actionVerbsFound++;
        }

        // Check for quantified metric / number
        if (METRIC_REGEX.test(text)) {
          metricsFound++;
        }
      });
    });

    // Score on bullet volume
    if (totalBullets >= 3) experienceScore += 5;
    if (totalBullets >= 6) experienceScore += 5;

    // Score on action verb density
    const verbRatio = totalBullets > 0 ? actionVerbsFound / totalBullets : 0;
    if (verbRatio >= 0.6) experienceScore += 8;
    else if (verbRatio >= 0.3) experienceScore += 4;
    else suggestions.push('Start more bullet points with strong past-tense action verbs (e.g. Architected, Spearheaded, Reduced).');

    // Score on metrics
    const metricRatio = totalBullets > 0 ? metricsFound / totalBullets : 0;
    if (metricRatio >= 0.5) experienceScore += 7;
    else if (metricRatio >= 0.2) experienceScore += 4;
    else suggestions.push('Quantify your achievements with measurable results (%, $, metrics, scale).');
  }

  // 4. Skills Section (Max 15 pts)
  let skillsScore = 0;
  const skills = resume.cv.sections.skills || [];
  if (skills.length > 0) {
    skillsScore += 10;
    const totalSkillsText = skills.map((s) => s.details).join(', ');
    const count = totalSkillsText.split(',').filter((x) => x.trim().length > 0).length;
    if (count >= 8) skillsScore += 5;
    else suggestions.push('Include at least 8-12 specific technical skills or tools for keyword ATS indexing.');
  } else {
    missingCriticalFields.push('Skills section');
  }

  // 5. Education & Formatting (Max 15 pts)
  let formattingScore = 0;
  const education = resume.cv.sections.education || [];
  if (education.length > 0) {
    formattingScore += 10;
  } else {
    missingCriticalFields.push('Education entry');
  }

  if (resume.design.theme) {
    formattingScore += 5; // Valid ATS-friendly layout
  }

  const totalScore = Math.min(
    100,
    contactScore + summaryScore + experienceScore + skillsScore + formattingScore
  );

  return {
    totalScore,
    contactScore,
    summaryScore,
    experienceScore,
    skillsScore,
    formattingScore,
    actionVerbsCount: actionVerbsFound,
    metricsCount: metricsFound,
    bulletCount: totalBullets,
    suggestions,
    missingCriticalFields,
  };
}
