import styled from 'styled-components';

const Wrapper = styled.article`
  border-radius: var(--borderRadius);
  background: var(--white);
  padding: 3rem 2rem;
  box-shadow: var(--shadow-2);
  width: 100%;
  height: 100%;
  .no-data-container {
    border: 1px solid var(--grey-200);
    border-radius: var(--borderRadius);
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;

    @media (max-width: 500px) {
      flex-direction: column;
      justify-content: center;
      .icon {
        margin-bottom: 1rem;
      }
    }
  }
  h4 {
    font-size: 1.5rem;
    color: var(--grey-400);
    letter-spacing: 0.1rem;
    margin: 0;
  }
  .icon {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    margin-right: 1rem;
    color: var(--primary-500);
  }
  svg {
    font-size: 2rem;
  }
  .action {
    text-transform: none !important;
    color: ${(props) => props.color} !important;
  }
`;
export default Wrapper;
