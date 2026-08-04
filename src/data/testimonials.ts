// Real quotes from real people. NOTHING GOES IN HERE THAT WAS NOT ACTUALLY
// SAID. No paraphrases, no "something like what they'd say", no placeholder
// copy that might survive to production. An invented testimonial is the one
// thing on this site that would be a lie rather than a rough edge.
//
// The section renders only when this array is non-empty, so the homepage and
// /services simply skip it until the quotes arrive.
//
// How to add one:
//   1. Ask the person for two or three sentences, in writing.
//   2. Get their explicit OK to publish it with their name and role.
//   3. Paste it verbatim. Fix typos only.
//   4. Drop their photo in public/brand/people/<slug>.jpg (square, ~200px)
//      and check `git ls-files` picks it up (see the *.png rule in .gitignore).
//
// Good targets, in order of how much weight they carry:
//   - CZS / Masaryk University (the assistant is live on their official site)
//   - OneBond or iGalileo (paid engineering work)
//   - an InzerPro paying customer (proof the product is worth money)

export interface Testimonial {
  /** The quote, verbatim. Two or three sentences reads best. */
  quote: string;
  /** Full name. Anonymous testimonials are not worth publishing. */
  name: string;
  /** Role and organisation, e.g. "Head of IT, CZS Masaryk University". */
  role: string;
  /** Optional square photo under public/brand/people/. */
  photo?: string;
  /** Optional link to the person or their organisation. */
  url?: string;
}

export const TESTIMONIALS: Testimonial[] = [];
