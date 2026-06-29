import React from 'react';
import { IconType } from 'react-icons';
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaDiscord,
  FaSlack,
  FaApple,
} from 'react-icons/fa6';

export type SharePlatform = 'x' | 'linkedin' | 'facebook' | 'discord' | 'slack' | 'imessage';

const META: Record<SharePlatform, { label: string; Icon: IconType }> = {
  x: { label: 'X (Twitter)', Icon: FaXTwitter },
  linkedin: { label: 'LinkedIn', Icon: FaLinkedinIn },
  facebook: { label: 'Facebook', Icon: FaFacebookF },
  discord: { label: 'Discord', Icon: FaDiscord },
  slack: { label: 'Slack', Icon: FaSlack },
  imessage: { label: 'iMessage', Icon: FaApple },
};

interface SharePreviewCardProps {
  platform: SharePlatform;
  image: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  siteName: string;
}

// One reusable card; the platform variant only changes styling/order via
// the data-platform attribute, so every preview shares the same structure.
const SharePreviewCard: React.FC<SharePreviewCardProps> = ({
  platform,
  image,
  title,
  description,
  url,
  domain,
  siteName,
}) => {
  const { label, Icon } = META[platform];
  return (
    <figure className="spc" data-platform={platform}>
      <figcaption className="spc__platform">
        <Icon />
        {label}
      </figcaption>
      <a className="spc__card" href={url} target="_blank" rel="noopener noreferrer">
        <div className="spc__media">
          <img src={image} alt={`${siteName} share preview`} />
        </div>
        <div className="spc__meta">
          <span className="spc__domain">{domain}</span>
          <span className="spc__title">{title}</span>
          <span className="spc__desc">{description}</span>
        </div>
      </a>
    </figure>
  );
};

export default SharePreviewCard;
