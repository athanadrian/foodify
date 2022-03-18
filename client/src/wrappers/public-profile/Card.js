import styled from 'styled-components';

const Wrapper = styled.article`
  margin-top: 2rem;
  background: var(--white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--borderRadius);
  border-bottom-left-radius: var(--borderRadius);
  border-bottom-right-radius: var(--borderRadius);
  position: relative;
  &::before {
    content: 'user';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--white);
    color: var(--grey-500);
    border-top-right-radius: var(--borderRadius);
    border-top-left-radius: var(--borderRadius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--letterSpacing);
    font-size: 1rem;
  }
  .bio {
    color: var(--grey-300);
  }
  .links {
    p,
    a {
      text-transform: capitalize;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      margin-top: 1rem;
      color: var(--primary-500);
      transition: var(--transition);
      svg {
        color: var(--grey-500);
      }
      &:hover {
        color: var(--primary-300);
      }
    }
  }
`;
export default Wrapper;
