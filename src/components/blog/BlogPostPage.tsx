import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LuSun, LuMoon } from 'react-icons/lu';
import { BLOG_POSTS } from '../../data/blog';
import Seo, { SITE_URL, PERSON_ID } from '../../seo/Seo';
import { formatDate, readingTime } from './blogUtils';
import './BlogPage.scss';

type FontPref = 'serif' | 'sans' | 'mono';
type ThemePref = 'light' | 'dark';

const FONT_KEY = 'blog-font';
const THEME_KEY = 'blog-theme';

const AVATAR = '/eduard-hvizdak.jpg';
const GITHUB = 'https://github.com/Rauded';
const LINKEDIN = 'https://www.linkedin.com/in/eduard-hvizdak';

function getStored<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  if (typeof window === 'undefined') return fallback;
  const v = window.localStorage.getItem(key) as T | null;
  return v && allowed.includes(v) ? v : fallback;
}

const FONT_LABELS: Record<FontPref, string> = { serif: 'Serif', sans: 'Sans', mono: 'Mono' };

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const [font, setFont] = useState<FontPref>(() =>
    getStored<FontPref>(FONT_KEY, 'serif', ['serif', 'sans', 'mono'])
  );
  const [theme, setTheme] = useState<ThemePref>(() =>
    getStored<ThemePref>(THEME_KEY, 'dark', ['light', 'dark'])
  );
  const [progress, setProgress] = useState(0);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.localStorage.setItem(FONT_KEY, font);
  }, [font]);
  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Reading-progress bar tied to the article body's scroll position.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = bodyRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(distance, 0));
      setProgress(distance > 0 ? (scrolled / distance) * 100 : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [slug]);

  // Esc closes the image lightbox.
  useEffect(() => {
    if (!zoomSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomSrc(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomSrc]);

  // Click any image in the article body to open it full-screen.
  const onBodyClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const src = target.getAttribute('src');
      if (src) setZoomSrc(src);
    }
  }, []);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const minutes = readingTime(post.content);
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  const related = [...sameCategory, ...others].slice(0, 3);

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    ...(post.thumbnail ? { image: `${SITE_URL}${post.thumbnail}` } : {}),
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { '@type': 'Person', '@id': PERSON_ID, name: 'Eduard Hvižďák' },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="blog-post" data-font={font} data-theme={theme}>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.thumbnail}
        type="article"
        jsonLd={blogPostingLd}
      />
      <div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <div className="blog-post__inner">
        <div className="blog-post__topbar">
          <Link to="/blog" className="blog-back">
            <FaArrowLeft />
            All posts
          </Link>
          <div className="reading-controls">
            <div className="reading-controls__fonts" role="group" aria-label="Reading font">
              {(['serif', 'sans', 'mono'] as FontPref[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  className={font === f ? 'is-active' : ''}
                  aria-pressed={font === f}
                  onClick={() => setFont(f)}
                >
                  {FONT_LABELS[f]}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="reading-controls__theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light reading mode' : 'Switch to dark reading mode'}
            >
              {theme === 'dark' ? <LuSun /> : <LuMoon />}
            </button>
          </div>
        </div>

        <span className="blog-post__category">{post.category}</span>
        <h1 className="blog-post__title">{post.title}</h1>

        <div className="blog-post__byline">
          <img className="blog-post__avatar" src={AVATAR} alt="Eduard Hvižďák" loading="lazy" />
          <div className="blog-post__byline-meta">
            <span className="blog-post__author">Eduard Hvižďák</span>
            <span className="blog-post__sub">
              {formatDate(post.date)} · {minutes} min read
            </span>
          </div>
        </div>

        <div
          ref={bodyRef}
          className="blog-post__body"
          onClick={onBodyClick}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <aside className="author-card">
          <img className="author-card__avatar" src={AVATAR} alt="Eduard Hvižďák" loading="lazy" />
          <div className="author-card__info">
            <span className="author-card__label">Written by</span>
            <span className="author-card__name">Eduard Hvižďák</span>
            <p className="author-card__bio">
              AI engineer and founder. I build SaaS and AI products, compete at hackathons, and
              write about what I learn along the way.
            </p>
            <div className="author-card__links">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </aside>

        {related.length > 0 && (
          <section className="related">
            <h2 className="related__heading">More from the blog</h2>
            <div className="related__grid">
              {related.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="related__card">
                  <span className="related__category">{p.category}</span>
                  <span className="related__title">{p.title}</span>
                  <span className="related__meta">
                    {formatDate(p.date)} · {readingTime(p.content)} min read
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {zoomSrc && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setZoomSrc(null)}
        >
          <img src={zoomSrc} alt="" />
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
