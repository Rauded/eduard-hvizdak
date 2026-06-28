import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { BLOG_POSTS } from '../../data/blog';
import Seo, { SITE_URL, PERSON_ID } from '../../seo/Seo';
import './BlogPage.scss';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
    <div className="blog-post">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.thumbnail}
        type="article"
        jsonLd={blogPostingLd}
      />
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
