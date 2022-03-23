import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify};
  /* .info-end {
    justify-content: end;
  } */
  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      font-size: 1.2rem;
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .label {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-weight: 600;
  }
`;
export default Wrapper;
