import { css } from 'styled-components';

export const shadows = css`
  --shadow-1:
    0.5px 1px 1px hsl(0deg 0% 0% / 0.7);
  --shadow-2:
    1px 2px 2px hsl(0deg 0% 0% / 0.333),
    2px 4px 4px hsl(0deg 0% 0% / 0.333),
    3px 6px 6px hsl(0deg 0% 0% / 0.333);
  --shadow-3:
    1px 2px 2px hsl(0deg 0% 0% / 0.2),
    2px 4px 4px hsl(0deg 0% 0% / 0.2),
    4px 8px 8px hsl(0deg 0% 0% / 0.2),
    8px 16px 16px hsl(0deg 0% 0% / 0.2),
    16px 32px 32px hsl(0deg 0% 0% / 0.2);
`;
