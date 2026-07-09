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
          <h2 className="about-title">About Me</h2>
          <p>
            Hello! My name is <span className="purple-text">Eduard Hvizdak</span>.{' '}
            {expert
              ? "I'm an AI engineer focused on building real-world systems powered by large language models."
              : 'I’m a computer science student at Masaryk University and AI developer focused on building real-world systems powered by large language models.'}{' '}
            Most recently, I’ve been working on AI infrastructure for <span className="purple-text">document intelligence, multi-agent pipelines, and retrieval-augmented knowledge systems</span>.
          </p>
          <p>
            My interests evolve with the problems I’m exploring, but lately I’ve been especially focused on <span className="purple-text">agentic AI systems, retrieval architectures, and large-scale document analysis</span> using modern embedding models and vector search.
          </p>
          <p>
            My skillset spans a wide range of technologies, and I believe strongly in choosing the right tool for the problem rather than locking into a single framework or stack. I enjoy designing systems where language models interact with retrieval engines, structured data, and external tools to solve complex tasks. Much of my work involves building <span className="purple-text">FastAPI backends, asynchronous pipelines, and vector search infrastructure</span> that allows AI systems to operate reliably at scale.
          </p>
          <p>
            Outside of programming, you’ll usually find me reading, experimenting with new technologies and occasionally scrolling Twitter.
          </p>
        </div>
        <div className="about-photo">
          <picture>
            <source srcSet={myPhotoWebP} type="image/webp" />
            <img src={myPhoto} alt="Eduard Hvizdak" className="profile-photo" loading="lazy" />
          </picture>
        </div>
      </section>

      {/* Toolkit index + meta grid: hairline-ruled list (Nomenclature style),
          a ghosted section word (oliver_gareis), and a mono label/value grid.
          All patterns from the Design & UI bookmarks. */}
      <section className="about-index">
        <span className="about-index__ghost" aria-hidden="true">TOOLKIT</span>
        <span className="about-index__rail" aria-hidden="true">PYTHON · LLMS · RETRIEVAL</span>

        <div className="about-index__body">
          <h3 className="about-index__title">
            Toolkit<sup>1</sup>
          </h3>

          <ul className="about-index__list">
            <li><span className="k">Python</span><span className="v">primary language</span></li>
            <li><span className="k">LangChain</span><span className="v">agent &amp; RAG orchestration</span></li>
            <li><span className="k">FastAPI</span><span className="v">async backends</span></li>
            <li><span className="k">Vector search</span><span className="v">retrieval infrastructure</span></li>
            <li><span className="k">Multi-agent</span><span className="v">tool-using pipelines</span></li>
            <li><span className="k">Embeddings</span><span className="v">document intelligence</span></li>
            <li><span className="k">TypeScript</span><span className="v">product front ends</span></li>
            <li><span className="k">Postgres</span><span className="v">structured data</span></li>
          </ul>

          <dl className="about-index__meta">
            <div>
              <dt>Focus</dt>
              <dd>Agentic AI, RAG, document intelligence</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>Python · FastAPI · LangChain · Postgres</dd>
            </div>
            <div>
              <dt>Based</dt>
              <dd>Brno, Czechia &middot; Masaryk University</dd>
            </div>
            <div>
              <dt>Elsewhere</dt>
              <dd>
                <a href="https://github.com/Rauded" target="_blank" rel="noreferrer">GitHub</a>,{' '}
                <a href="https://x.com/AdraHaeman" target="_blank" rel="noreferrer">X</a>
              </dd>
            </div>
          </dl>
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
            Invited by the <span className="purple-text">European Commission</span> to discuss
            the Digital Fairness Act
          </h3>
          <p>
            With EU Commissioner <span className="purple-text">Michael McGrath</span>, as part of
            the Youth Policy Dialogue initiative.
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
