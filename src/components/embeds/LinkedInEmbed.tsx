import React from 'react';
import { LuLinkedin } from 'react-icons/lu';

// Reusable LinkedIn post embed. `src` is the iframe URL LinkedIn gives you via
// a post's "Embed this post" option, e.g.
//   https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890
// or it can be built from a urn:li:activity / urn:li:ugcPost id.
// Without a src it renders a clear placeholder so the slot is visible.

function toEmbedSrc(input?: string): string | null {
  if (!input) return null;
  if (input.includes('/embed/')) return input;
  // Accept a raw urn or a normal post URL containing one.
  const urn = input.match(/urn:li:(?:share|activity|ugcPost):\d+/);
  if (urn) return `https://www.linkedin.com/embed/feed/update/${urn[0]}`;
  const activity = input.match(/activity-(\d+)/);
  if (activity) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activity[1]}`;
  return null;
}

interface LinkedInEmbedProps {
  src?: string;
  height?: number;
  label?: string;
}

const LinkedInEmbed: React.FC<LinkedInEmbedProps> = ({ src, height = 540, label }) => {
  const embedSrc = toEmbedSrc(src);

  if (!embedSrc) {
    return (
      <div className="linkedin-embed linkedin-embed--empty">
        <LuLinkedin />
        <p className="linkedin-embed__title">LinkedIn post embed</p>
        <p className="linkedin-embed__hint">
          {label ??
            'Open a LinkedIn post → “…” menu → “Embed this post”, paste the URL or urn here.'}
        </p>
      </div>
    );
  }

  return (
    <iframe
      className="linkedin-embed"
      src={embedSrc}
      height={height}
      width="100%"
      frameBorder="0"
      allowFullScreen
      title="Embedded LinkedIn post"
      loading="lazy"
    />
  );
};

export default LinkedInEmbed;
