import styled from 'styled-components';

const Wrapper = styled.section`
  .user-statistics {
    margin-top: 2rem;
    margin-bottom: 0;
    text-align: center;
  }
  .container-row {
    display: grid;
    row-gap: 2rem;
    padding-bottom: 2rem;
  }
  @media (min-width: 768px) {
    .container-row {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .container-row {
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 1rem;
    }
  }
`;
export default Wrapper;
