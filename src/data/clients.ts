// Organisations Eduard has built production AI systems for. Single source of
// truth for both the homepage logo strip (components/about/ClientLogos.tsx)
// and the fuller /references page.
//
// Logos live under public/brand/clients and are referenced by URL, not import.
// Roles and dates come from the resume.

export interface Client {
  name: string;
  role: string;
  dates: string;
  url: string;
  logo: string;
  current?: boolean;
  /**
   * Optical size multiplier for the homepage strip, applied to the shared base
   * height. These marks range from a 3.9:1 wordmark (Artiffine) to a 0.88:1
   * solid glyph (OneBond), so equal HEIGHT makes the wide ones look enormous
   * and equal WIDTH makes the tall ones vanish. The factors below start from
   * equal bounding-box area (height proportional to 1/sqrt(aspect)) and are
   * then nudged by eye: a heavy filled mark reads bigger than its box, a thin
   * outlined one reads smaller. Bigger number = bigger logo. Default 1.
   */
  scale?: number;
}

export const CLIENTS: Client[] = [
  { name: 'Artiffine', role: 'AI & Web3 studio', dates: 'Present', url: 'https://www.artiffine.com', logo: '/brand/clients/artiffine.svg', scale: 0.7, current: true },
  { name: 'Masaryk University, CZS', role: 'AI Systems Engineer', dates: '2025 - Present', url: 'https://czs.muni.cz/cs/', logo: '/brand/clients/masaryk-university.png', scale: 0.95, current: true },
  { name: 'OneBond', role: 'AI Systems Engineer', dates: '2025 - 2026', url: 'https://onebond.tech', logo: '/brand/clients/onebond.svg', scale: 1.2 },
  { name: 'iGalileo', role: 'AI Developer', dates: '2025', url: 'https://www.igalileo.cz/', logo: '/brand/clients/igalileo.svg', scale: 0.95 },
  { name: 'EDUC Alliance', role: 'Think Tank Member & Programmer', dates: '2024 - 2025', url: 'https://www.educalliance.eu', logo: '/brand/clients/educ-alliance.png', scale: 1.0 },
];
