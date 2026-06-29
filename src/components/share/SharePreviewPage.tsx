import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Seo, { SITE_URL, DEFAULT_OG_IMAGE } from '../../seo/Seo';
import SharePreviewCard, { SharePlatform } from './SharePreviewCard';
import Tweet from '../embeds/Tweet';
import LinkedInEmbed from '../embeds/LinkedInEmbed';
import '../embeds/embeds.scss';
import './share.scss';

// Current share metadata (mirrors public/index.html). Update these here when
// the OG tags change so this page always reflects what gets shared.
const SHARE = {
  siteName: 'Eduard Hvižďák',
  title: 'Eduard Hvižďák – AI Engineer & Founder',
  description:
    'Production AI systems (RAG, multi-agent) and real SaaS products — InzerPro, NasadClaw, KouzelníkNaAkci.',
  url: `${SITE_URL}/`,
  domain: 'eduard-hvizdak.vercel.app',
  image: DEFAULT_OG_IMAGE,
};

const PLATFORMS: SharePlatform[] = ['x', 'linkedin', 'facebook', 'discord', 'slack', 'imessage'];

// A neutral, always-available public post to showcase the X embed component.
const SHOWCASE_TWEET = 'https://twitter.com/jack/status/20';

const SharePreviewPage: React.FC = () => {
  return (
    <div className="share-preview">
      <Seo
        title="Share Preview"
        description="Internal preview of how the site looks when shared on social platforms."
        path="/share-preview"
      />
      <div className="share-preview__inner">
        <Link to="/" className="share-back">
          <FaArrowLeft />
          Back home
        </Link>

        <header className="share-preview__head">
          <p className="share-preview__eyebrow">Internal · Share Preview</p>
          <h1 className="share-preview__title">Social share preview</h1>
          <p className="share-preview__subtitle">
            How <strong>{SHARE.domain}</strong> looks when the link is shared. Use this to review
            the share badge and the embed components, then iterate.
          </p>
        </header>

        {/* Current OG metadata */}
        <section className="share-section">
          <h2 className="share-section__title">Current metadata</h2>
          <dl className="share-meta">
            <div><dt>og:title</dt><dd>{SHARE.title}</dd></div>
            <div><dt>og:description</dt><dd>{SHARE.description}</dd></div>
            <div><dt>og:image</dt><dd><a href={SHARE.image} target="_blank" rel="noopener noreferrer">{SHARE.image}</a></dd></div>
            <div><dt>og:url</dt><dd>{SHARE.url}</dd></div>
            <div><dt>twitter:card</dt><dd>summary_large_image</dd></div>
          </dl>
          <div className="share-rawimage">
            <img src={SHARE.image} alt="Current Open Graph image" />
            <span className="share-rawimage__cap">The raw 1200×630 OG image</span>
          </div>
        </section>

        {/* Platform link-preview mockups */}
        <section className="share-section">
          <h2 className="share-section__title">Link previews by platform</h2>
          <p className="share-section__note">
            Approximations of each platform's link-unfurl card using the live metadata above.
          </p>
          <div className="share-grid">
            {PLATFORMS.map((p) => (
              <SharePreviewCard
                key={p}
                platform={p}
                image={SHARE.image}
                title={SHARE.title}
                description={SHARE.description}
                url={SHARE.url}
                domain={SHARE.domain}
                siteName={SHARE.siteName}
              />
            ))}
          </div>
        </section>

        {/* Embed components showcase */}
        <section className="share-section">
          <h2 className="share-section__title">Post embeds</h2>
          <p className="share-section__note">
            Reusable embed components for dropping live social posts into the site.
          </p>
          <div className="share-embeds">
            <div className="share-embed">
              <h3 className="share-embed__label">X / Twitter — live embed (sample)</h3>
              <Tweet url={SHOWCASE_TWEET} theme="dark" />
            </div>
            <div className="share-embed">
              <h3 className="share-embed__label">LinkedIn — post embed</h3>
              <LinkedInEmbed />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SharePreviewPage;
