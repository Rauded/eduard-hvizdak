import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { BLOG_POSTS } from '../../data/blog';
import './BlogPage.scss';

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
          {BLOG_POSTS.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card">
              <div className="blog-card__meta">
                <span className="blog-card__category">{post.category}</span>
                <span className="blog-card__date">{post.date}</span>
              </div>
              <h2 className="blog-card__title">{post.title}</h2>
              <p className="blog-card__excerpt">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;
