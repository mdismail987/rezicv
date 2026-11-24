import React from 'react';
import { ResumeData } from '../../types/resume';

/**
 * Minimalist Template:
 * Maximum whitespace, clean understated typography, and effortless ATS parsing.
 */
export const MinimalistTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { cv, design } = resume;
  const { sections } = cv;

  return (
    <div
      className="p-10 text-slate-800 bg-white font-sans text-[10pt] leading-relaxed"
      style={{
        fontFamily: design.font_family === 'serif' ? 'Georgia, serif' : 'Inter, system-ui, sans-serif',
        fontSize: design.font_size,
      }}
    >
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-1">
          {cv.name || 'Your Full Name'}
        </h1>
        {cv.headline && (
          <p className="text-xs tracking-widest uppercase text-slate-500 mb-2">
            {cv.headline}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 text-xs text-slate-500">
          {cv.email && <span>{cv.email}</span>}
          {cv.phone && <span>{cv.phone}</span>}
          {cv.location && <span>{cv.location}</span>}
          {cv.website && <span>{cv.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {sections.summary && (
        <section className="mb-6">
          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            {sections.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sections.experience && sections.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {sections.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-slate-900">{exp.position}</span>
                  <span className="text-slate-400 text-[9pt]">
                    {exp.start_date} — {exp.end_date}
                  </span>
                </div>
                <div className="text-slate-500 mb-1.5">{exp.company} • {exp.location}</div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1 text-slate-700 list-disc pl-4">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-normal">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sections.skills && sections.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            Skills
          </h2>
          <div className="space-y-1 text-xs text-slate-700">
            {sections.skills.map((skill) => (
              <div key={skill.id} className="flex">
                <span className="font-medium text-slate-900 w-32 flex-shrink-0">{skill.name}</span>
                <span className="text-slate-600">{skill.details}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sections.education && sections.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            Education
          </h2>
          <div className="space-y-2 text-xs">
            {sections.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-medium text-slate-900">{edu.institution}</span> — {edu.degree} in {edu.area}
                </div>
                <span className="text-slate-400">{edu.start_date} — {edu.end_date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
