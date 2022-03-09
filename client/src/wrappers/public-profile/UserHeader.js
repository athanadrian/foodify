import styled from 'styled-components';

const Wrapper = styled.article`
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--blue-dark);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: var(--blue-light);
      }
    }
    button {
      text-align: center;
      color: var(--primary-500);
      background: var(--white);
      border: 1px solid var(--primary-500);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--primary-500);
        color: var(--white);
      }
    }
  }
`;
export default Wrapper;
