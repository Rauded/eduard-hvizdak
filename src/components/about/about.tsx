import React from "react";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import "./about.scss";
import myPhoto from "../../assets/about/picture_of_me.jpeg";
import myPhotoWebP from "../../assets/about/picture_of_me.webp";
import { isExpertMode } from "../../config/positioning";

const About: React.FC = () => {
  const expert = isExpertMode();

  return (
    <div className="about-container" id="about">
      <section className="about-intro">
        <div className="about-text">
          <h2 className="about-title">About</h2>
          <p>
            I'm <span className="accent-text">Eduard Hvizdak</span>,{' '}
            {expert
              ? 'an AI engineer in Brno. I build production systems around large language models:'
              : 'a computer science student at Masaryk University and AI developer. I build production systems around large language models:'}{' '}
            <span className="accent-text">document intelligence, multi-agent pipelines, and retrieval-augmented search</span>.
          </p>
          <p>
            Day to day that means FastAPI backends, asynchronous pipelines, and vector search
            infrastructure that keeps LLM systems reliable at scale. Outside of work I read a lot
            and ship side projects, a few of which grew into products with paying customers.
          </p>
        </div>
        <div className="about-photo">
          <picture>
            <source srcSet={myPhotoWebP} type="image/webp" />
            <img src={myPhoto} alt="Eduard Hvizdak" className="profile-photo" loading="lazy" />
          </picture>
        </div>
      </section>

      <Link to="/blog/digital-fairness-act-youth-dialogue" className="about-highlight">
        <div className="about-highlight__media">
          <img
            src="/blog/digital-fairness/youth-policy-dialogue.png"
            alt="Youth Policy Dialogue on the Digital Fairness Act with Commissioner Michael McGrath in Ljubljana"
            loading="lazy"
          />
        </div>
        <div className="about-highlight__text">
          <span className="about-highlight__eyebrow">Recent Highlight</span>
          <h3 className="about-highlight__title">
            Invited by the European Commission to discuss the Digital Fairness Act
          </h3>
          <p>
            With EU Commissioner Michael McGrath, as part of the Youth Policy Dialogue initiative.
          </p>
          <span className="about-highlight__cta">
            Read the story
            <LuArrowRight className="about-highlight__cta-icon" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default About;
