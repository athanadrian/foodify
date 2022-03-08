import styled from 'styled-components';

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: var(--white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
    letter-spacing: var(--letterSpacing);
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  .username {
    text-transform: lowercase;
    color: var(--grey-400);
    letter-spacing: var(--letterSpacing);
    font-size: 1.5rem;
  }
`;
export default Wrapper;
