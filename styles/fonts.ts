import { css } from 'styled-components';

export const fonts = css`
  @font-face {
    font-family: 'Stapel';
    src: url('https://static.aviasales.com/selene-static/entrypoint/fc134b81b00547587b04.woff2')
      format('woff2');
  }
  --font-display: Stapel, -apple-system, BlinkMacSystemFont, Inter, Roboto,
    Helvetica, Arial, sans-serif;
  --font-text: Inter, -apple-system, BlinkMacSystemFont, Roboto, Helvetica,
    Arial, sans-serif;
  font-family: var(--font-text);
  font-size: 16px;
  color: var(--color-graphite-900);
`;

export const typography = {
  text: css`
    font-family: var(--font-text);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  `
};
