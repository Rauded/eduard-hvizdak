import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { ResumeSection } from './resumetypes';

// Split a company label like "@EDUC Alliance (European Digital University Alliance)"
// into a primary name and an optional parenthetical that renders on its own line.
const splitCompany = (company: string): { name: string; sub?: string } => {
  const match = company.match(/^(.*?)\s*(\([^)]*\))\s*$/);
  if (match) {
    return { name: match[1], sub: match[2] };
  }
  return { name: company };
};

// Scannable emphasis: highlight the concrete tech / method nouns in each bullet
// so the experience does not read as one flat block. Longest phrases first so
// the alternation matches "Retrieval-Augmented Generation" before "RAG".
const KEYWORDS = [
  'Retrieval-Augmented Generation',
  'autonomous multi-agent pipeline',
  'knowledge ingestion pipelines',
  'AI knowledge assistants',
  'distributed embedding pipelines',
  'AI-driven form automation',
  'conversation memory',
  'async job queues',
  'multi-agent',
  'vector search',
  'fact-verification',
  'LangChain',
  'PostgreSQL',
  'PGVector',
  'VoyageAI',
  'OpenSearch',
  'FastAPI',
  'embeddings',
  'reranking',
  'scraping',
  'BM25',
  'MMR',
  'OCR',
  'RAG',
  'LLM',
];

const KW_RE = new RegExp(
  `(${KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g'
);

const highlight = (text: string): React.ReactNode[] =>
  text.split(KW_RE).map((part, i) =>
    KEYWORDS.includes(part) ? (
      <span key={i} className="kw">{part}</span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const VisualAid: React.FC<{ section: ResumeSection }> = ({ section }) => {
  return (
    <div className="section-container">
      <h1 className="section-title">{section.title}</h1>
      <div className="line-container">
        {section.entries.map((entry) => {
          const { name, sub } = splitCompany(entry.company);
          const companyBody = (
            <>
              <span className="company__main">
                {name}
                {entry.website && <LuArrowUpRight className="company__external" aria-hidden="true" />}
              </span>
              {sub && <span className="company__sub">{sub}</span>}
            </>
          );
          return (
          <div key={entry.title} className="job-container">
            <h3 className="job-title">
              {entry.title}{' '}
              {entry.website ? (
                <a className="company company--link" href={entry.website} target="_blank" rel="noopener noreferrer">
                  {companyBody}
                </a>
              ) : (
                <span className="company">{companyBody}</span>
              )}
            </h3>
            <p className="job-dates">{entry.dates}</p>
            {entry.bulletPoints && (
              <ul>
                {entry.bulletPoints.map((bulletPoint) => (
                  <li key={bulletPoint} className="bullet-point">
                    {highlight(bulletPoint)}
                  </li>
                ))}
              </ul>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisualAid;