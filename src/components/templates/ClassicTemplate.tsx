import React from 'react';
import { ResumeData } from '../../types/resume';

export const ClassicTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { cv, design } = resume;
  const { sections } = cv;

  return (
    <div
      className="p-8 text-slate-900 bg-white font-sans text-[10pt] leading-normal"
      style={{
        fontFamily: design.font_family === 'serif' ? 'Merriweather, Georgia, serif' : design.font_family === 'mono' ? 'JetBrains Mono, monospace' : 'Inter, system-ui, sans-serif',
        fontSize: design.font_size,
      }}
    >
      {/* Header */}
      <header className="text-center pb-3 border-b-2 border-slate-900 mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase mb-1">
          {cv.name || 'Your Full Name'}
        </h1>
        {cv.headline && (
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            {cv.headline}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-slate-700">
          {cv.location && <span>{cv.location}</span>}
          {cv.location && cv.email && <span>•</span>}
          {cv.email && <a href={`mailto:${cv.email}`} className="hover:underline">{cv.email}</a>}
          {cv.phone && <span>•</span>}
          {cv.phone && <span>{cv.phone}</span>}
          {cv.website && <span>•</span>}
          {cv.website && (
            <a href={cv.website} target="_blank" rel="noreferrer" className="hover:underline">
              {cv.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {cv.social_networks?.map((soc, idx) => (
            <React.Fragment key={idx}>
              <span>•</span>
              <span className="font-medium">{soc.network}: {soc.username}</span>
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary */}
      {sections.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 text-justify leading-relaxed">
            {sections.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {sections.experience && sections.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {sections.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>{exp.position}</span>
                  <span className="text-slate-600 font-normal">
                    {exp.start_date} – {exp.end_date}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic text-slate-700 mb-1">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc pl-4 space-y-1 text-slate-800">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {sections.education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>{edu.institution}</span>
                  <span className="text-slate-600 font-normal">
                    {edu.start_date} – {edu.end_date}
                  </span>
                </div>
                <div className="text-slate-700 italic">
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

      {/* Projects */}
      {sections.projects && sections.projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-2.5">
            {sections.projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>
                    {proj.name}
                    {proj.url && (
                      <span className="font-normal text-slate-600 ml-1.5 text-[9pt]">
                        ({proj.url.replace(/^https?:\/\//, '')})
                      </span>
                    )}
                  </span>
                  {proj.description && (
                    <span className="text-slate-600 italic font-normal text-[9pt]">{proj.description}</span>
                  )}
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-slate-800">
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

      {/* Skills */}
      {sections.skills && sections.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
            Technical Skills
          </h2>
          <div className="space-y-1 text-xs text-slate-800">
            {sections.skills.map((skill) => (
              <div key={skill.id} className="flex">
                <span className="font-bold text-slate-950 w-36 flex-shrink-0">{skill.name}:</span>
                <span className="text-slate-700">{skill.details}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sections.certifications && sections.certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
            Certifications & Honors
          </h2>
          <div className="space-y-1 text-xs">
            {sections.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span className="font-medium text-slate-950">
                  {cert.name} <span className="text-slate-600 font-normal">({cert.issuer})</span>
                </span>
                <span className="text-slate-600">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
