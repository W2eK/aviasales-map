import { css } from 'styled-components';

type FontDescription = {
  family: string;
  url: string;
  weight?: number[];
};

export const families: Record<string, FontDescription> = {
  text: {
    family: `-apple-system, BlinkMacSystemFont, Inter, Roboto, Helvetica, Arial, sans-serif`,
    url: `https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&display=swap`,
    weight: [300, 500, 600]
  },
  display: {
    family:
      'Stapel,-apple-system,BlinkMacSystemFont,Inter,Roboto,Helvetica,Arial,sans-serif;',
    url: 'https://static.aviasales.com/selene-static/entrypoint/fc134b81b00547587b04.woff2'
  }
};

const variables = Object.entries(families)
  .map(([name, { family }]) => `--font-${name}: ${family}`)
  .join('\n');

export const fonts = css`
  ${variables}
  font-family: var(--font-text);
  font-size: 16px;
  color: var(--color-graphite-900);
`;
