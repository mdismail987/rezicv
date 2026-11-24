import React from 'react';
import { ResumeData } from '../../types/resume';

/**
 * Engineering Resume Template:
 * Optimized for software engineers, data scientists, and DevOps roles.
 * Clean monospaced accents, categorized technical stack, and bullet point emphasis.
 */
export const EngineeringTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { cv, design } = resume;
  const { sections } = cv;

  return (
    <div
      className="p-8 text-slate-900 bg-white font-sans text-[9.5pt] leading-normal"
      style={{
        fontFamily: design.font_family === 'mono' ? 'JetBrains Mono, monospace' : 'Inter, system-ui, sans-serif',
        fontSize: design.font_size,
      }}
    >
      {/* Header */}
      <header className="pb-2 border-b-2 border-slate-950 mb-3">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight text-slate-950">
              {cv.name || 'Your Full Name'}
            </h1>
            <p className="text-xs font-semibold text-slate-700">
              {cv.headline || 'Software Engineering Professional'}
            </p>
          </div>
          <div className="text-right text-[9pt] text-slate-700 space-y-0.5">
            <div>{cv.email} | {cv.phone}</div>
            <div>{cv.location}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3 text-[9pt] text-slate-600 mt-1 font-mono">
          {cv.website && <span>web: {cv.website.replace(/^https?:\/\//, '')}</span>}
          {cv.social_networks?.map((soc, idx) => (
            <span key={idx}>{soc.network.toLowerCase()}: {soc.username}</span>
          ))}
        </div>
      </header>

      {/* Technical Skills Category */}
      {sections.skills && sections.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5 font-mono">
            // Technical Matrix
          </h2>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {sections.skills.map((skill) => (
              <div key={skill.id} className="flex">
                <span className="font-bold text-slate-950 w-36 flex-shrink-0 font-mono text-[9pt]">
                  [{skill.name}]
                </span>
                <span className="text-slate-800">{skill.details}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {sections.experience && sections.experience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5 font-mono">
            // Engineering Experience
          </h2>
          <div className="space-y-3">
            {sections.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-950">
                  <span className="text-[10pt]">{exp.position} @ {exp.company}</span>
                  <span className="font-mono text-[9pt] text-slate-600 font-normal">
                    {exp.start_date} ~ {exp.end_date}
                  </span>
                </div>
                {exp.location && <div className="text-[8.5pt] text-slate-500 mb-1">{exp.location}</div>}
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

      {/* Projects */}
      {sections.projects && sections.projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5 font-mono">
            // Systems & Open Source
          </h2>
          <div className="space-y-2">
            {sections.projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>
                    {proj.name}
                    {proj.url && <span className="font-mono text-[8.5pt] font-normal text-slate-500 ml-2">&lt;{proj.url.replace(/^https?:\/\//, '')}&gt;</span>}
                  </span>
                </div>
                {proj.highlights && (
                  <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-slate-800">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
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
        <section className="mb-2">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5 font-mono">
            // Education & Credentials
          </h2>
          {sections.education.map((edu) => (
            <div key={edu.id} className="text-xs flex justify-between">
              <div>
                <span className="font-bold text-slate-950">{edu.institution}</span> — {edu.degree} in {edu.area}
              </div>
              <div className="font-mono text-[9pt] text-slate-600">{edu.start_date} ~ {edu.end_date}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
