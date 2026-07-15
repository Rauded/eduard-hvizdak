import React from "react";
import { LuArrowRight } from "react-icons/lu";
import "./about.scss";
import LocaleLink from "../common/LocaleLink";
import myPhoto from "../../assets/about/picture_of_me.jpeg";
import myPhotoWebP from "../../assets/about/picture_of_me.webp";
import { isExpertMode } from "../../config/positioning";
import { useT } from "../../i18n";

const About: React.FC = () => {
  const expert = isExpertMode();
  const t = useT("about");

  return (
    <div className="about-container" id="about">
      <section className="about-intro">
        <div className="about-text">
          <h2 className="about-title">{t.title}</h2>
          <p>
            {t.greeting} <span className="purple-text">Eduard Hvizdak</span>.{' '}
            {expert ? t.introExpert : t.introStudent}{' '}
            {t.recentPrefix} <span className="purple-text">{t.recentSpan}</span>.
          </p>
          <p>
            {t.interestsPrefix} <span className="purple-text">{t.interestsSpan}</span> {t.interestsSuffix}
          </p>
          <p>
            {t.skillsPrefix} <span className="purple-text">{t.skillsSpan}</span> {t.skillsSuffix}
          </p>
          <p>
            {t.outside}
          </p>
        </div>
        <div className="about-photo">
          <picture>
            <source srcSet={myPhotoWebP} type="image/webp" />
            <img src={myPhoto} alt="Eduard Hvizdak" className="profile-photo" loading="lazy" width={1200} height={1599} />
          </picture>
        </div>
      </section>

      <LocaleLink to="/blog/digital-fairness-act-youth-dialogue" className="about-highlight" data-cuelume-press>
        <div className="about-highlight__media">
          <img
            src="/blog/digital-fairness/youth-policy-dialogue.png"
            alt="Youth Policy Dialogue on the Digital Fairness Act with Commissioner Michael McGrath in Ljubljana"
            loading="lazy"
            width={872}
            height={826}
          />
        </div>
        <div className="about-highlight__text">
          <span className="about-highlight__eyebrow">{t.highlightEyebrow}</span>
          <h3 className="about-highlight__title">
            {t.highlightTitlePrefix} <span className="purple-text">{t.highlightTitleSpan}</span>{' '}
            {t.highlightTitleSuffix}
          </h3>
          <p>
            {t.highlightDescPrefix} <span className="purple-text">{t.highlightDescSpan}</span>,{' '}
            {t.highlightDescSuffix}
          </p>
          <span className="about-highlight__cta">
            {t.highlightCta}
            <LuArrowRight className="about-highlight__cta-icon" aria-hidden="true" />
          </span>
        </div>
      </LocaleLink>
    </div>
  );
};

export default About;
