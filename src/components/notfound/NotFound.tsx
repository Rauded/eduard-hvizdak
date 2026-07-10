import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import './notfound.scss';

// Catch-all route. The SPA rewrite still returns HTTP 200 for unknown paths
// (a real 404 status would need hosting-level config), but the noindex tag
// keeps these soft-404s out of search and AI crawlers.
const NotFound: React.FC = () => (
  <>
    <Seo
      title="Page not found"
      description="This page does not exist. Head back to eduardhvizdak.com."
      path="/404"
      noindex
    />
    <section className="notfound">
      <p className="notfound__code">404</p>
      <h1 className="notfound__title">Page not found</h1>
      <p className="notfound__text">
        The page you were looking for isn't here. It may have moved or never existed.
      </p>
      <Link to="/" className="notfound__cta">
        <LuArrowLeft aria-hidden="true" />
        Back to home
      </Link>
    </section>
  </>
);

export default NotFound;
