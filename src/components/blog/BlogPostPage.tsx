import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { BLOG_POSTS } from '../../data/blog';
import './BlogPage.scss';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="blog-post">
      <div className="blog-post__inner">
        <Link to="/blog" className="blog-back">
          <FaArrowLeft />
          All posts
        </Link>
        <span className="blog-post__category">{post.category}</span>
        <h1 className="blog-post__title">{post.title}</h1>
        <span className="blog-post__date">{post.date}</span>
        <div
          className="blog-post__body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogPostPage;
