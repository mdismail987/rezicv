import React from 'react';
import { ResumeData } from '../../types/resume';

/**
 * SB2Nov (Jake's Resume / Reddit r/EngineeringResumes standard)
 * Widely considered the #1 ATS-beating resume layout.
 */
export const SB2NovTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { cv, design } = resume;
  const { sections } = cv;

  return (
    <div
      className="p-8 text-slate-950 bg-white font-sans text-[9.5pt] leading-tight"
      style={{
        fontFamily: design.font_family === 'serif' ? 'Georgia, serif' : design.font_family === 'mono' ? 'monospace' : 'Inter, system-ui, sans-serif',
        fontSize: design.font_size,
      }}
    >
      {/* Header - Centered with pipe separators */}
      <header className="text-center pb-2 mb-3">
        <h1 className="text-2xl font-bold text-slate-950 tracking-wide uppercase mb-1">
          {cv.name || 'Your Full Name'}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs text-slate-800">
          {cv.phone && <span>{cv.phone}</span>}
          {cv.phone && cv.email && <span>|</span>}
          {cv.email && <a href={`mailto:${cv.email}`} className="hover:underline">{cv.email}</a>}
          {cv.website && <span>|</span>}
          {cv.website && (
            <a href={cv.website} target="_blank" rel="noreferrer" className="hover:underline">
              {cv.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {cv.social_networks?.map((soc, idx) => (
            <React.Fragment key={idx}>
              <span>|</span>
              <span className="font-medium">{soc.network}: {soc.username}</span>
            </React.Fragment>
          ))}
          {cv.location && <span>|</span>}
          {cv.location && <span>{cv.location}</span>}
        </div>
      </header>

      {/* Technical Skills placed high up for high ATS keyword density */}
      {sections.skills && sections.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
            Technical Skills
          </h2>
          <ul className="text-xs text-slate-900 space-y-0.5">
            {sections.skills.map((skill) => (
              <li key={skill.id} className="leading-snug">
                <span className="font-bold text-slate-950">{skill.name}: </span>
                <span>{skill.details}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {sections.experience && sections.experience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
            Experience
          </h2>
          <div className="space-y-2.5">
            {sections.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>{exp.company}</span>
                  <span className="font-normal text-slate-700">
                    {exp.start_date} – {exp.end_date}
                  </span>
                </div>
                <div className="flex justify-between italic text-slate-800 mb-1">
                  <span>{exp.position}</span>
                  {exp.location && <span className="not-italic text-slate-700">{exp.location}</span>}
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc pl-4 space-y-1 text-slate-900">
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

      {/* Projects */}
      {sections.projects && sections.projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
            Projects
          </h2>
          <div className="space-y-2">
            {sections.projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>
                    {proj.name}
                    {proj.description && (
                      <span className="font-normal italic text-slate-700 ml-1.5">| {proj.description}</span>
                    )}
                  </span>
                  {proj.url && (
                    <span className="font-normal text-slate-600 text-[9pt]">
                      {proj.url.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-slate-900">
                    {proj.highlights.map((h, i) => (
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
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
            Education
          </h2>
          <div className="space-y-1.5">
            {sections.education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>{edu.institution}</span>
                  <span className="font-normal text-slate-700">
                    {edu.start_date} – {edu.end_date}
                  </span>
                </div>
                <div className="text-slate-800 italic">
                  {edu.degree} in {edu.area}
                </div>
                {edu.highlights && (
                  <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-slate-800">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
