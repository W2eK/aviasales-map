import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  background: linear-gradient(var(--color-ink-50), rgba(255, 255, 255, 0));
  padding: 1rem;
  & > * {
    margin: 0 auto;
    /* max-width: 10em; */
  }
`;

export const Header = styled.h2`
  font-size: 2em;
  font-family: var(--font-display);
`;

export const Subheader = styled.div`
  /* font-size: 1.6em; */
  font-weight: 300;
  margin: 0 auto;
`;
