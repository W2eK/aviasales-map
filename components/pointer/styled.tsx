import styled from 'styled-components';

export const PointerCircle = styled.div`
  padding: 4px;
  background-color: var(--color-primary-800);
  border-radius: 50%;
  /* opacity: 0.3; */
`;

export const PointerOutline = styled.div`
  background-color: rgba(6, 86, 254, 0.3);
  padding: 8px;
  transform: scaleY(var(--scale, 1));
  border-radius: 50%;
`;
