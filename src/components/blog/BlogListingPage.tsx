import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LuArrowRight, LuPin } from 'react-icons/lu';
import { BLOG_POSTS } from '../../data/blog';
import { CHAPTERS } from '../things/thingsData';
import Seo from '../../seo/Seo';
import { formatDate, getThumbnail, readingTime } from './blogUtils';
import { useTheme } from '../theme/ThemeContext';
import './BlogPage.scss';

const BlogListingPage: React.FC = () => {
  const { theme } = useTheme();

  // Newest first, but a pinned post is always surfaced as the featured hero.
  const byDate = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const featured = byDate.find((p) => p.pinned) ?? byDate[0];
  const rest = byDate.filter((p) => p.slug !== featured?.slug);
  const featuredThumb = featured ? getThumbnail(featured) : null;

  return (
    <div className="blog-listing" data-theme={theme}>
      <Seo
        title="Blog"
        description="Writing by Eduard Hvizdak — thoughts on AI engineering, building SaaS, hackathons, and life."
        path="/blog"
      />
      <div className="blog-listing__inner">
        <div className="blog-listing__topbar">
          <Link to="/" className="blog-back">
            <FaArrowLeft />
            Back home
          </Link>
        </div>
        <p className="blog-listing__eyebrow">Writing</p>
        <h1 className="blog-listing__title">Blog</h1>
        <p className="blog-listing__subtitle">Thoughts, experiences, and reflections.</p>

        {featured && (
          <Link to={`/blog/${featured.slug}`} className="blog-feature">
            {featuredThumb && (
              <div className="blog-feature__thumb">
                <img src={featuredThumb} alt={featured.title} loading="lazy" />
              </div>
            )}
            <div className="blog-feature__body">
              <div className="blog-feature__meta">
                {featured.pinned && (
                  <span className="blog-feature__pin">
                    <LuPin />
                    Pinned
                  </span>
                )}
                <span className="blog-chip">{featured.category}</span>
                <span className="blog-feature__date">
                  {formatDate(featured.date)} · {readingTime(featured.content)} min read
                </span>
              </div>
              <h2 className="blog-feature__title">{featured.title}</h2>
              <p className="blog-feature__excerpt">{featured.excerpt}</p>
              <span className="blog-feature__more">
                Read article <LuArrowRight />
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="blog-rows">
            {rest.map((post) => {
              const thumb = getThumbnail(post);
              return (
                <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-row">
                  <div className="blog-row__body">
                    <div className="blog-row__meta">
                      <span className="blog-chip">{post.category}</span>
                      <span className="blog-row__date">
                        {formatDate(post.date)} · {readingTime(post.content)} min read
                      </span>
                    </div>
                    <h2 className="blog-row__title">{post.title}</h2>
                    <p className="blog-row__excerpt">{post.excerpt}</p>
                  </div>
                  {thumb && (
                    <div className="blog-row__thumb">
                      <img src={thumb} alt={post.title} loading="lazy" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Evergreen, always-growing page. It lives here rather than in the top
            nav so the blog stays the one place for anything long-form. */}
        <p className="blog-living-label">Living pages</p>
        <Link to="/things" className="blog-living">
          <div className="blog-living__head">
            <span className="blog-chip">Tech I love</span>
            <span className="blog-living__meta">{CHAPTERS.length} chapters · updated often</span>
          </div>
          <h2 className="blog-living__title">The gear I actually use, one chapter at a time</h2>
          <p className="blog-living__excerpt">
            A chaptered write-up of the tech I love and reach for every day, with my own notes,
            photos and clips. It keeps growing as my setup evolves.
          </p>
          <ul className="blog-living__chapters" aria-hidden="true">
            {CHAPTERS.slice(0, 6).map((c) => (
              <li key={c.id}>{c.title}</li>
            ))}
            {CHAPTERS.length > 6 && <li className="blog-living__more">+{CHAPTERS.length - 6} more</li>}
          </ul>
          <span className="blog-living__cta">Read the page <LuArrowRight /></span>
        </Link>
      </div>
    </div>
  );
};

export default BlogListingPage;
