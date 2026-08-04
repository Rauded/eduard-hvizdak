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
}

export const CLIENTS: Client[] = [
  { name: 'Artiffine', role: 'AI & Web3 studio', dates: 'Present', url: 'https://www.artiffine.com', logo: '/brand/clients/artiffine.svg', current: true },
  { name: 'Masaryk University, CZS', role: 'AI Systems Engineer', dates: '2025 - Present', url: 'https://czs.muni.cz/cs/', logo: '/brand/clients/masaryk-university.png', current: true },
  { name: 'OneBond', role: 'AI Systems Engineer', dates: '2025 - 2026', url: 'https://onebond.tech', logo: '/brand/clients/onebond.svg' },
  { name: 'iGalileo', role: 'AI Developer', dates: '2025', url: 'https://www.igalileo.cz/', logo: '/brand/clients/igalileo.svg' },
  { name: 'EDUC Alliance', role: 'Think Tank Member & Programmer', dates: '2024 - 2025', url: 'https://www.educalliance.eu', logo: '/brand/clients/educ-alliance.png' },
];
