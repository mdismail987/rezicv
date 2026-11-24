import { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
  id: 'resume-default-01',
  title: 'Full Stack Engineer - Tech Target',
  updatedAt: new Date().toISOString(),
  cv: {
    name: 'Alexander Mitchell',
    headline: 'Senior Full Stack Software Engineer',
    location: 'San Francisco, CA',
    email: 'alex.mitchell@example.com',
    phone: '+1 (415) 555-0192',
    website: 'https://alexmitchell.dev',
    social_networks: [
      { network: 'LinkedIn', username: 'alexmitchell-dev' },
      { network: 'GitHub', username: 'alexmitchell' },
    ],
    sections: {
      summary:
        'Results-driven Senior Software Engineer with 6+ years of experience designing and scaling distributed web applications and cloud microservices. Proven track record of reducing latency by 42% and increasing engineering velocity. Passionate about clean architecture, TypeScript, Go, and high-performance developer tooling.',
      experience: [
        {
          id: 'exp-1',
          company: 'Stripe',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          start_date: '2022-03',
          end_date: 'Present',
          highlights: [
            'Architected and deployed high-throughput payment ingestion pipeline processing $85M+ in weekly volume with 99.999% uptime.',
            'Spearheaded migration of legacy monolith to event-driven Go microservices, reducing p99 API response times from 340ms to 78ms.',
            'Mentored 6 junior and mid-level engineers, standardizing automated testing workflows and raising team test coverage from 62% to 94%.',
            'Implemented intelligent retry mechanism with exponential backoff and jitter, reducing transient transaction failures by 31%.',
          ],
        },
        {
          id: 'exp-2',
          company: 'DoorDash',
          position: 'Software Engineer II',
          location: 'Sunnyvale, CA',
          start_date: '2019-08',
          end_date: '2022-02',
          highlights: [
            'Engineered dynamic real-time driver dispatch algorithm utilizing Redis and WebSockets, cutting average delivery wait times by 4.2 minutes.',
            'Optimized PostgreSQL database queries and indexing strategies, decreasing query execution costs by $28,000 annually.',
            'Collaborated closely with Product and UX teams to deliver an accessible checkout experience adopted by 1.4M monthly active users.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University of California, Berkeley',
          area: 'Computer Science',
          degree: 'B.S.',
          start_date: '2015-08',
          end_date: '2019-05',
          highlights: [
            'Cumulative GPA: 3.84 / 4.0 (Dean’s Honor List)',
            'Relevant Coursework: Distributed Systems, Operating Systems, Algorithms & Data Structures, Database Architecture',
          ],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Distributed KV-Store',
          description: 'A Raft-consensus based distributed key-value store built in Go',
          url: 'https://github.com/alexmitchell/distributed-kv',
          highlights: [
            'Implemented Raft leader election, log replication, and snapshotting handling simulated node partitions.',
            'Benchmarked system performance to achieve 45,000 writes/second across a 5-node cluster with linearizable consistency.',
          ],
        },
        {
          id: 'proj-2',
          name: 'OpenAI Code Reviewer CLI',
          description: 'Developer productivity tool for automated pull request quality analysis',
          url: 'https://github.com/alexmitchell/code-lens-cli',
          highlights: [
            'Created open-source CLI with 1,200+ GitHub stars that identifies security anti-patterns and performance bottlenecks.',
            'Integrated into GitHub Actions CI pipelines across 80+ engineering teams worldwide.',
          ],
        },
      ],
      skills: [
        {
          id: 'skill-1',
          name: 'Languages',
          details: 'TypeScript, JavaScript, Go, Python, SQL, HTML5, CSS3',
        },
        {
          id: 'skill-2',
          name: 'Frameworks & Libraries',
          details: 'React, Next.js, Node.js, Express, Gin, Tailwind CSS, GraphQL',
        },
        {
          id: 'skill-3',
          name: 'Cloud & Infrastructure',
          details: 'AWS (ECS, Lambda, S3, RDS), Docker, Kubernetes, Terraform, PostgreSQL, Redis, Kafka',
        },
        {
          id: 'skill-4',
          name: 'Developer Tools & Practices',
          details: 'Git, CI/CD (GitHub Actions), Microservices, Agile/Scrum, Jest, Playwright, TDD',
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2023',
        },
      ],
    },
  },
  design: {
    theme: 'classic',
    font_family: 'sans',
    font_size: '10pt',
    page_size: 'letter',
    primary_color: '#0f172a',
    margins: '0.5in',
  },
};
