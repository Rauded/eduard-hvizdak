import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import Seo from '../../seo/Seo';
import { useBlogTheme } from '../blog/useBlogTheme';
import ThemeToggle from '../blog/ThemeToggle';
import Tweet from '../embeds/Tweet';
import LinkedInEmbed from '../embeds/LinkedInEmbed';
import '../embeds/embeds.scss';
import './elsewhere.scss';

// LinkedIn posts to feature (the "Embed this post" URLs).
const LINKEDIN_POSTS: { src: string; height: number }[] = [
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7475316031021031424', height: 1219 },
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7473426243208527872?collapsed=1', height: 628 },
];

// Favourite posts on X. Add tweet URLs here to feature them.
const FAVOURITE_TWEETS: string[] = [
  'https://twitter.com/jack/status/20', // sample — replace with favourites
];

const ElsewherePage: React.FC = () => {
  const [theme, toggleTheme] = useBlogTheme();

  return (
    <div className="elsewhere" data-theme={theme}>
      <Seo
        title="Elsewhere"
        description="Posts, talks, and things Eduard Hvižďák has shared on LinkedIn and X."
        path="/elsewhere"
      />
      <div className="elsewhere__inner">
        <div className="elsewhere__topbar">
          <Link to="/blog" className="blog-back">
            <FaArrowLeft />
            Back to blog
          </Link>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <header className="elsewhere__head">
          <p className="elsewhere__eyebrow">Elsewhere</p>
          <h1 className="elsewhere__title">Posts &amp; things I&rsquo;ve shared</h1>
          <p className="elsewhere__subtitle">
            A running wall of what I&rsquo;ve been posting on LinkedIn and X.
          </p>
        </header>

        <section className="elsewhere__section">
          <h2 className="elsewhere__section-title">
            <FaLinkedinIn />
            On LinkedIn
          </h2>
          <div className="elsewhere__grid">
            {LINKEDIN_POSTS.map((p) => (
              <LinkedInEmbed key={p.src} src={p.src} height={p.height} />
            ))}
          </div>
        </section>

        <section className="elsewhere__section">
          <h2 className="elsewhere__section-title">
            <FaXTwitter />
            Favourite posts on X
          </h2>
          <div className="elsewhere__grid elsewhere__grid--tweets">
            {FAVOURITE_TWEETS.map((url) => (
              <Tweet key={url} url={url} theme={theme} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ElsewherePage;
