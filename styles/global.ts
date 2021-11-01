import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';
import { fonts } from './fonts';
import { shadows } from './shadows';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Resets */
    margin: 0;
    padding: 0;
    background-color: red;
    min-height: 100vh;

    /* Variables */
    ${colors}
    ${fonts}
    ${shadows}
    background-color: var(--color-primary-500);
  }
  * {
    box-sizing:border-box;
  }
`;
