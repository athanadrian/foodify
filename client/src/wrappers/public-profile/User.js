import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 420px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
`;
export default Wrapper;
