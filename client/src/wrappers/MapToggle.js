import styled from 'styled-components';

const Wrapper = styled.section`
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
  .all-foodys {
    position: absolute;
    top: 1.3rem;
    left: 1.2rem;
    background: none;
    border: none;
    z-index: 10;
    img {
      width: 25px;
    }
  }
  .my-foodys {
    position: absolute;
    top: 1.3rem;
    left: 5.2rem;
    background: none;
    border: none;
    z-index: 10;
    img {
      width: 25px;
    }
  }
`;
export default Wrapper;
