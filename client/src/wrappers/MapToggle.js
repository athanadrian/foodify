import styled from 'styled-components';

const Wrapper = styled.section`
  .btn-container {
    position: absolute;
    top: 1.3rem;
    left: 1.2rem;
    width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .all-foodys,
  .my-foodys {
    background: none;
    border: none;
    z-index: 10;
    img {
      width: 25px;
    }
  }

  @media (max-width: 574px) {
    .btn-container {
      height: 100px;
      flex-direction: column;
      top: 1.3rem;
      left: -1rem;
    }
  }
`;
export default Wrapper;
