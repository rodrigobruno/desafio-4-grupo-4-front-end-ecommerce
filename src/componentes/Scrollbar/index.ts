import { createGlobalStyle } from 'styled-components';

interface Props {
    visibilidade: boolean;
}

export const Scrollbar = createGlobalStyle<Props>`
    body {
      ${({ visibilidade }) => {
          return `
            overflow: ${visibilidade ? 'hidden' : 'auto'};
        `;
      }}
    }
`;
