import styled from 'styled-components';

const Wrapper = styled.div`
  .follow-btn {
    text-align: center;
    border: 1px solid var(--primary-500);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    transition: var(--transition);
    cursor: pointer;
  }
  .follow {
    color: var(--primary-500);
    background: var(--white);
    &:hover {
      background: var(--primary-500);
      color: var(--white);
    }
  }
  .following-btn {
    background: var(--primary-500);
    color: var(--white);
    &:hover {
      color: var(--primary-500);
      background: var(--white);
    }
  }
`;
export default Wrapper;
