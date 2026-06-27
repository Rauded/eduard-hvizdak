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
                    {bulletPoint}
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