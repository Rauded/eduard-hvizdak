import React from "react";
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
    </div>
  );
};

export default About;
