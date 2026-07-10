import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LuArrowRight, LuPin } from 'react-icons/lu';
import { BLOG_POSTS, localizeBlogPost } from '../../data/blog';
import { CHAPTERS } from '../things/thingsData';
import Seo from '../../seo/Seo';
import { formatDate, getThumbnail, readingTime } from './blogUtils';
import { useTheme } from '../theme/ThemeContext';
import { useT } from '../../i18n';
import { useLocale } from '../../i18n/LocaleContext';
import './BlogPage.scss';

const BlogListingPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('blog');
  const { locale } = useLocale();

  // Newest first, but a pinned post is always surfaced as the featured hero.
  // Localize each post so its category/title/excerpt match the active language;
  // grouping/equality still holds because all posts share the localized strings.
  const byDate = [...BLOG_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => localizeBlogPost(p, locale));
  const featured = byDate.find((p) => p.pinned) ?? byDate[0];
  const rest = byDate.filter((p) => p.slug !== featured?.slug);
  const featuredThumb = featured ? getThumbnail(featured) : null;

  return (
    <div className="blog-listing" data-theme={theme}>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        path="/blog"
      />
      <div className="blog-listing__inner">
        <div className="blog-listing__topbar">
          <Link to="/" className="blog-back">
            <FaArrowLeft />
            {t.backHome}
          </Link>
        </div>
        <p className="blog-listing__eyebrow">{t.eyebrow}</p>
        <h1 className="blog-listing__title">{t.title}</h1>
        <p className="blog-listing__subtitle">{t.subtitle}</p>

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
                    {t.pinned}
                  </span>
                )}
                <span className="blog-chip">{featured.category}</span>
                <span className="blog-feature__date">
                  {formatDate(featured.date, locale)} · {readingTime(featured.content)} {t.minRead}
                </span>
              </div>
              <h2 className="blog-feature__title">{featured.title}</h2>
              <p className="blog-feature__excerpt">{featured.excerpt}</p>
              <span className="blog-feature__more">
                {t.readArticle} <LuArrowRight />
              </span>
            </div>
          </Link>
        )}

        <div className="blog-rows">
          {rest.map((post) => {
            const thumb = getThumbnail(post);
            return (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-row">
                <div className="blog-row__body">
                  <div className="blog-row__meta">
                    <span className="blog-chip">{post.category}</span>
                    <span className="blog-row__date">
                      {formatDate(post.date, locale)} · {readingTime(post.content)} {t.minRead}
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

          {/* "Tech I love" sits in the feed as an ordinary entry, not in the
              top nav, so the blog is the one place for longer writing. */}
          <Link to="/things" className="blog-row">
            <div className="blog-row__body">
              <div className="blog-row__meta">
                <span className="blog-chip">{t.techChip}</span>
                <span className="blog-row__date">{CHAPTERS.length} {t.chaptersOngoing}</span>
              </div>
              <h2 className="blog-row__title">{t.techTitle}</h2>
              <p className="blog-row__excerpt">{t.techExcerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;
