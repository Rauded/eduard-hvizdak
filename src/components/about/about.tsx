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
            Hello! My name is <span className="purple-text">Eduard Hvižďák</span>. I’m a computer science student at Masaryk University and AI developer focused on building real-world systems powered by large language models. Most recently, I’ve been working on AI infrastructure for <span className="purple-text">document intelligence, multi-agent pipelines, and retrieval-augmented knowledge systems</span>.
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
            Digital Fairness Act — Youth Policy Dialogue
          </h3>
          <p>
            I joined a <span className="purple-text">European Commission</span> Youth Policy
            Dialogue in Ljubljana with EU Commissioner <span className="purple-text">Michael
            McGrath</span>, working through what the upcoming Digital Fairness Act should do
            about deceptive design, pricing transparency, and digital contracts.
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
