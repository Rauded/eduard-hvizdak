import { LuDownload, LuExternalLink } from 'react-icons/lu';
import { ResumeData } from './resumetypes';
import resumeData from '../../data/resume.json';
import './resume.scss';
import VisualAid from './visualaid';
import cvPdf from '../../assets/resume/EduardHvizdakCV.pdf';

const Resume: React.FC = () => {
  const data: ResumeData = resumeData;

  return (
    <div className="resume-container" id="resume">
      <div className="content-wrapper">
        <div className="left-column">
          {data.sections
            .filter((section) => section.title !== 'Education')
            .map((section) => (
              <VisualAid key={section.title} section={section} />
            ))}
          {/* Education section commented out
          {data.sections
            .filter((section) => section.title === 'Education')
            .map((section) => (
              <VisualAid key={section.title} section={section} />
            ))}
          */}
        </div>
        <div className="right-column">
          {/* #toolbar=0 hides Chrome's PDF toolbar AND the auto-opening
              thumbnail sidebar (Chrome ignores navpanes/pagemode). The
              download/open actions below replace the toolbar's buttons. */}
          <iframe
            title="Eduard Hvizdak Resume"
            src={`${cvPdf}#toolbar=0`}
          ></iframe>
          <div className="cv-actions">
            <a className="cv-actions__btn cv-actions__btn--primary" href={cvPdf} download="EduardHvizdakCV.pdf">
              <LuDownload aria-hidden="true" />
              Download CV
            </a>
            <a
              className="cv-actions__btn cv-actions__btn--ghost"
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuExternalLink aria-hidden="true" />
              Open in new tab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
