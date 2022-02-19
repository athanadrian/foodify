import styled from 'styled-components';

const Wrapper = styled.section`
  .container {
    width: 100%;
    max-width: 100%;
    border: 1px solid var(--grey-100);
    border-radius: var(--borderRadius);
  }

  .container-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.1rem;
  }
  @media (min-width: 992px) {
    .container-center {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default Wrapper;
