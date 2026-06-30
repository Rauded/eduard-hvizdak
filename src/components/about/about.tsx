import React from "react";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import "./about.scss";
import myPhoto from "../../assets/about/picture_of_me.jpeg";
import myPhotoWebP from "../../assets/about/picture_of_me.webp";

const About: React.FC = () => {

  return (
    <div className="about-container" id="about">
      <section className="about-intro">
        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <p>
            I’m <span className="purple-text">Eduard Hvižďák</span>, a <span className="purple-text">founding engineer</span> who ships <span className="purple-text">production AI systems</span> end-to-end. My work centers on retrieval-augmented document intelligence, multi-agent tooling, and the infrastructure that makes language models reliable in production: <span className="purple-text">FastAPI backends, async pipelines, vector search, and LangChain orchestration</span>.
          </p>
          <p>
            I don’t stop at prototypes. I’ve taken three SaaS products from zero to live, <span className="purple-text">paying customers</span>: <span className="purple-text">InzerPro</span>, an automation platform for the Bazoš classifieds (React, Supabase, Stripe, Deno); <span className="purple-text">NasadClaw</span>, on-prem AI deployment for Czech and Slovak enterprises (Next.js, TypeScript); and <span className="purple-text">KouzelníkNaAkci</span>, a two-sided marketplace. As an AI Developer at OneBond, Masaryk University’s CZS, and iGalileo, I’ve built the same kind of systems inside organisations.
          </p>
          <p>
            I’m finishing a computer science degree at <span className="purple-text">Masaryk University</span> in Brno (2026) and I’m bilingual CZ/SK. I treat the stack as a means to an end — I pick the right tool for the problem and own the result from architecture to deploy.
          </p>
        </div>
        <div className="about-photo">
          <picture>
            <source srcSet={myPhotoWebP} type="image/webp" />
            <img src={myPhoto} alt="Eduard Hvižďák" className="profile-photo" loading="lazy" />
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
