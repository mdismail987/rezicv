import React from 'react';
import { ResumeData } from '../../types/resume';

/**
 * ModernCV Template:
 * Contemporary header with colored accent bar and crisp layout.
 */
export const ModernCVTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { cv, design } = resume;
  const { sections } = cv;
  const accent = design.primary_color || '#059669';

  return (
    <div
      className="p-8 text-slate-800 bg-white font-sans text-[10pt] leading-normal"
      style={{
        fontFamily: design.font_family === 'serif' ? 'Georgia, serif' : 'Inter, system-ui, sans-serif',
        fontSize: design.font_size,
      }}
    >
      {/* Modern Header with accent line */}
      <header className="flex justify-between items-start pb-4 border-b-2 mb-4" style={{ borderColor: accent }}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: accent }}>
            {cv.name || 'Your Full Name'}
          </h1>
          {cv.headline && (
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mt-0.5">
              {cv.headline}
            </p>
          )}
        </div>
        <div className="text-right text-xs text-slate-600 space-y-0.5">
          {cv.email && <div><a href={`mailto:${cv.email}`} className="hover:underline">{cv.email}</a></div>}
          {cv.phone && <div>{cv.phone}</div>}
          {cv.location && <div>{cv.location}</div>}
          {cv.website && (
            <div>
              <a href={cv.website} target="_blank" rel="noreferrer" className="hover:underline">
                {cv.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {sections.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }}></span>
            Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed pl-4 border-l" style={{ borderColor: `${accent}40` }}>
            {sections.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sections.experience && sections.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }}></span>
            Experience
          </h2>
          <div className="space-y-3 pl-4 border-l" style={{ borderColor: `${accent}40` }}>
            {sections.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span className="text-sm font-semibold">{exp.position}</span>
                  <span className="text-slate-500 font-normal">
                    {exp.start_date} – {exp.end_date}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic text-slate-600 mb-1">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc pl-4 space-y-1 text-slate-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-snug">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sections.education && sections.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }}></span>
            Education
          </h2>
          <div className="space-y-2 pl-4 border-l" style={{ borderColor: `${accent}40` }}>
            {sections.education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{edu.institution}</span>
                  <span className="text-slate-500 font-normal">
                    {edu.start_date} – {edu.end_date}
                  </span>
                </div>
                <div className="text-slate-600 italic">
                  {edu.degree} in {edu.area}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sections.skills && sections.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }}></span>
            Skills
          </h2>
          <div className="space-y-1 text-xs text-slate-700 pl-4 border-l" style={{ borderColor: `${accent}40` }}>
            {sections.skills.map((skill) => (
              <div key={skill.id} className="flex">
                <span className="font-semibold text-slate-900 w-32 flex-shrink-0">{skill.name}:</span>
                <span>{skill.details}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
