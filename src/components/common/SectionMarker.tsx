import React from 'react';
import styled from 'styled-components';

// Blueprint section marker: a hairline rule carrying tick marks, a mono index
// (01, 02, ...) and the section label, after the "measured design canvas" look
// in Eduard's design bookmarks (ayushsoni Wideframe, WithWaleedSabir hero
// frames). Quiet by default: it reads as engineering chrome, not decoration.

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-px, 64px);
  color: var(--text-faint, #7484a0);

  @media (max-width: 768px) {
    padding: 0 var(--container-px, 24px);
    gap: 12px;
  }
`;

const Index = styled.span`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--accent-text, #182e5f);
  white-space: nowrap;
`;

const Label = styled.span`
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
`;

// The ruled line with evenly spaced ticks knocked along it via a repeating
// gradient, plus a square end cap. One element, no per-tick DOM.
const Rule = styled.span`
  position: relative;
  flex: 1;
  height: 7px;
  border-bottom: 1px solid var(--border, #e6e9ec);
  background-image: repeating-linear-gradient(
    90deg,
    var(--border, #e6e9ec) 0,
    var(--border, #e6e9ec) 1px,
    transparent 1px,
    transparent 48px
  );
  background-position: bottom left;
  background-repeat: repeat-x;
  background-size: 48px 4px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -2px;
    width: 4px;
    height: 4px;
    background: var(--page-bg, #ffffff);
    border: 1px solid var(--border, #e6e9ec);
  }
`;

interface Props {
  index: string;
  label: string;
}

const Marker = styled.div`
  padding: 56px 0 8px;

  @media (max-width: 768px) {
    padding: 40px 0 4px;
  }
`;

const SectionMarker: React.FC<Props> = ({ index, label }) => (
  <Marker aria-hidden="true">
    <Row>
      <Index>{index}</Index>
      <Label>{label}</Label>
      <Rule />
    </Row>
  </Marker>
);

export default SectionMarker;
