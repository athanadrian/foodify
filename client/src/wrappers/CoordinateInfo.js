import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 0.7rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .coord {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    margin-right: 0.5rem;
  }
  ::-ms-tooltip {
    text-transform: capitalize;
    color: red;
  }
`;
export default Wrapper;
