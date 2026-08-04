import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { CLIENTS } from '../../data/clients';
import LocaleLink from '../common/LocaleLink';
import { useT } from '../../i18n';
import './clientLogos.scss';

// Homepage proof strip. The same five organisations already lived on the
// /references page, but that page was unlinked and noindexed, so the strongest
// ready-made credibility signal on the site was unreachable. This puts it in
// front of the reader early and links through for the roles and dates.
const ClientLogos: React.FC = () => {
  const t = useT('clients');

  return (
    <section className="client-logos" aria-labelledby="client-logos-label">
      <p className="client-logos__label" id="client-logos-label">
        {t.label}
      </p>
      <ul className="client-logos__row">
        {CLIENTS.map((c) => (
          <li className="client-logos__item" key={c.name}>
            <a
              className="client-logos__link"
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${c.name} (${c.role}, ${c.dates})`}
            >
              <img src={c.logo} alt={c.name} loading="lazy" decoding="async" />
            </a>
          </li>
        ))}
      </ul>
      <LocaleLink to="/references" className="client-logos__more">
        {t.more}
        <LuArrowRight aria-hidden="true" />
      </LocaleLink>
    </section>
  );
};

export default ClientLogos;
