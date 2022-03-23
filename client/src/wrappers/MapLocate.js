import styled from 'styled-components';

const Wrapper = styled.section`
  .locate {
    position: absolute;
    top: 1.3rem;
    right: 1.2rem;
    background: none;
    border: none;
    z-index: 10;
  }
  .locate img {
    width: 30px;
    cursor: pointer;
  }
  .btn-cover {
    width: 45px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--backgroundColor) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  @media (max-width: 574px) {
    .locate {
      right: 0.5rem;
    }
  }
`;
export default Wrapper;
