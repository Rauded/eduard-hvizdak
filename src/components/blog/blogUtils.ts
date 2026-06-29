// Small presentation helpers shared by the blog listing and post pages.

/** "2026-06-25" → "Jun 25, 2026" (parsed as a local date to avoid TZ drift). */
export function formatDate(iso: string): string {
  const parts = iso.split('-').map(Number);
  const [y, m, d] = parts;
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Cover image for a post: explicit `thumbnail`, else the first <img> in its HTML. */
export function getThumbnail(post: { thumbnail?: string; content: string }): string | null {
  if (post.thumbnail) return post.thumbnail;
  const match = post.content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/** Estimated reading time in minutes from an HTML content string (~200 wpm). */
export function readingTime(html: string): number {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.round(words / 200));
}
