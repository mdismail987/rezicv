import yaml from 'js-yaml';
import { ResumeData } from '../types/resume';

/**
 * RenderCV Official YAML Serializer
 * Emits schema tag recognized by RenderCV CLI and modern editors.
 */
export function exportToRenderCVYaml(resume: ResumeData): string {
  const schemaComment = '# yaml-language-server: $schema=https://raw.githubusercontent.com/rendercv/rendercv/refs/tags/v2.8/schema.json\n\n';

  const renderCvObj = {
    cv: {
      name: resume.cv.name,
      headline: resume.cv.headline || undefined,
      location: resume.cv.location || undefined,
      email: resume.cv.email,
      phone: resume.cv.phone || undefined,
      website: resume.cv.website || undefined,
      social_networks: resume.cv.social_networks?.length
        ? resume.cv.social_networks.map((s) => ({
            network: s.network,
            username: s.username,
          }))
        : undefined,
      sections: {
        summary: resume.cv.sections.summary ? [resume.cv.sections.summary] : undefined,
        experience: resume.cv.sections.experience.map((exp) => ({
          company: exp.company,
          position: exp.position,
          location: exp.location || undefined,
          start_date: exp.start_date,
          end_date: exp.end_date,
          highlights: exp.highlights.filter((h) => h.trim().length > 0),
        })),
        education: resume.cv.sections.education.map((edu) => ({
          institution: edu.institution,
          area: edu.area,
          degree: edu.degree,
          start_date: edu.start_date,
          end_date: edu.end_date,
          highlights: edu.highlights?.filter((h) => h.trim().length > 0) || undefined,
        })),
        projects: resume.cv.sections.projects.map((proj) => ({
          name: proj.name,
          description: proj.description || undefined,
          url: proj.url || undefined,
          highlights: proj.highlights.filter((h) => h.trim().length > 0),
        })),
        skills: resume.cv.sections.skills.map((skill) => ({
          name: skill.name,
          details: skill.details,
        })),
        certifications: resume.cv.sections.certifications?.length
          ? resume.cv.sections.certifications.map((cert) => ({
              name: cert.name,
              issuer: cert.issuer,
              date: cert.date,
            }))
          : undefined,
      },
    },
    design: {
      theme: resume.design.theme,
      font: resume.design.font_family,
      font_size: resume.design.font_size,
      page_size: resume.design.page_size,
    },
  };

  const yamlString = yaml.dump(renderCvObj, {
    indent: 2,
    lineWidth: 120,
    noRefs: true,
  });

  return schemaComment + yamlString;
}

/**
 * Import RenderCV YAML or JSON into internal ResumeData format
 */
export function importFromRenderCVYaml(rawYaml: string, existingId?: string): ResumeData {
  const parsed = yaml.load(rawYaml) as any;
  if (!parsed || !parsed.cv) {
    throw new Error('Invalid RenderCV file format. Missing "cv" root object.');
  }

  const cv = parsed.cv;
  const sections = cv.sections || {};

  return {
    id: existingId || `resume-${Date.now()}`,
    title: `${cv.name || 'Imported'} Resume`,
    updatedAt: new Date().toISOString(),
    cv: {
      name: cv.name || 'Anonymous',
      headline: cv.headline || '',
      location: cv.location || '',
      email: cv.email || '',
      phone: cv.phone || '',
      website: cv.website || '',
      social_networks: Array.isArray(cv.social_networks)
        ? cv.social_networks.map((s: any) => ({
            network: s.network || 'Link',
            username: s.username || '',
          }))
        : [],
      sections: {
        summary: Array.isArray(sections.summary) ? sections.summary.join('\n\n') : (sections.summary || ''),
        experience: Array.isArray(sections.experience)
          ? sections.experience.map((exp: any, idx: number) => ({
              id: `exp-imp-${idx}-${Date.now()}`,
              company: exp.company || '',
              position: exp.position || '',
              location: exp.location || '',
              start_date: exp.start_date || '',
              end_date: exp.end_date || 'Present',
              highlights: Array.isArray(exp.highlights) ? exp.highlights : [],
            }))
          : [],
        education: Array.isArray(sections.education)
          ? sections.education.map((edu: any, idx: number) => ({
              id: `edu-imp-${idx}-${Date.now()}`,
              institution: edu.institution || '',
              area: edu.area || '',
              degree: edu.degree || '',
              start_date: edu.start_date || '',
              end_date: edu.end_date || '',
              highlights: Array.isArray(edu.highlights) ? edu.highlights : [],
            }))
          : [],
        projects: Array.isArray(sections.projects)
          ? sections.projects.map((proj: any, idx: number) => ({
              id: `proj-imp-${idx}-${Date.now()}`,
              name: proj.name || '',
              description: proj.description || '',
              url: proj.url || '',
              highlights: Array.isArray(proj.highlights) ? proj.highlights : [],
            }))
          : [],
        skills: Array.isArray(sections.skills)
          ? sections.skills.map((skill: any, idx: number) => ({
              id: `skill-imp-${idx}-${Date.now()}`,
              name: skill.name || 'Skill Set',
              details: skill.details || '',
            }))
          : [],
        certifications: Array.isArray(sections.certifications)
          ? sections.certifications.map((cert: any, idx: number) => ({
              id: `cert-imp-${idx}-${Date.now()}`,
              name: cert.name || '',
              issuer: cert.issuer || '',
              date: cert.date || '',
            }))
          : [],
      },
    },
    design: {
      theme: (parsed.design?.theme as any) || 'classic',
      font_family: (parsed.design?.font as any) || 'sans',
      font_size: (parsed.design?.font_size as any) || '10pt',
      page_size: (parsed.design?.page_size as any) || 'letter',
      primary_color: '#0f172a',
      margins: '0.5in',
    },
  };
}
