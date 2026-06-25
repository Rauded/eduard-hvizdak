import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { BLOG_POSTS, BlogPost } from '../../data/blog';
import './BlogPage.scss';

// Thumbnail for a post: the explicit `thumbnail` field, otherwise the first
// <img> found in its HTML content. Guarantees every card shows a cover image.
function getThumbnail(post: BlogPost): string | null {
  if (post.thumbnail) return post.thumbnail;
  const match = post.content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

const BlogListingPage: React.FC = () => {
  return (
    <div className="blog-listing">
      <div className="blog-listing__inner">
        <Link to="/" className="blog-back">
          <FaArrowLeft />
          Back home
        </Link>
        <p className="blog-listing__eyebrow">Writing</p>
        <h1 className="blog-listing__title">Blog</h1>
        <p className="blog-listing__subtitle">Thoughts, experiences, and reflections.</p>
        <div className="blog-listing__grid">
          {BLOG_POSTS.map((post) => {
            const thumb = getThumbnail(post);
            return (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card">
                <div className="blog-card__thumb">
                  {thumb && <img src={thumb} alt={post.title} loading="lazy" />}
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{post.category}</span>
                    <span className="blog-card__date">{post.date}</span>
                  </div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;
