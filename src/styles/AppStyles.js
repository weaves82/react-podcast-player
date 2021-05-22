import styled from 'styled-components'

const AppStyles = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  width: auto;
  margin: 0 auto;
  padding: var(--gutter);
  column-gap: var(--gutter);
  @media (min-width: 800px) {
    grid-template-columns: 1.5fr 1fr;
  }
  @media (min-width: 1000px) {
    width: var(--maxWidth);
  }
`;

export default AppStyles;