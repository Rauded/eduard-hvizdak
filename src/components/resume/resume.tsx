import { LuDownload, LuExternalLink } from 'react-icons/lu';
import { ResumeData } from './resumetypes';
import resumeData from '../../data/resume.json';
import resumeDataSk from '../../data/resume.sk.json';
import resumeDataCs from '../../data/resume.cs.json';
import './resume.scss';
import VisualAid from './visualaid';
import cvPdf from '../../assets/resume/EduardHvizdakCV.pdf';
import { useLocale } from '../../i18n/LocaleContext';
import { useT } from '../../i18n';

const Resume: React.FC = () => {
  const { locale } = useLocale();
  const t = useT('resume');
  // English is the canonical section order; Slovak and Czech mirror it
  // index-for-index.
  const enData: ResumeData = resumeData;
  const data: ResumeData =
    locale === 'cs' ? resumeDataCs : locale === 'sk' ? resumeDataSk : resumeData;

  return (
    <div className="resume-container" id="resume">
      <div className="content-wrapper">
        <div className="left-column">
          {data.sections
            // Filter on the English title so the choice is stable regardless of
            // the active language (the Education section stays hidden).
            .filter((_, i) => enData.sections[i].title !== 'Education')
            .map((section) => (
              <VisualAid key={section.title} section={section} />
            ))}
        </div>
        <div className="right-column">
          {/* #toolbar=0 hides Chrome's PDF toolbar AND the auto-opening
              thumbnail sidebar (Chrome ignores navpanes/pagemode). The
              download/open actions below replace the toolbar's buttons. */}
          <iframe
            title={t.iframeTitle}
            src={`${cvPdf}#toolbar=0`}
          ></iframe>
          <div className="cv-actions">
            <a className="cv-actions__btn cv-actions__btn--primary" href={cvPdf} download="EduardHvizdakCV.pdf">
              <LuDownload aria-hidden="true" />
              {t.downloadCv}
            </a>
            <a
              className="cv-actions__btn cv-actions__btn--ghost"
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuExternalLink aria-hidden="true" />
              {t.openNewTab}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
