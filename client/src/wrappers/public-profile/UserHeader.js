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
  }
`;
export default Wrapper;
