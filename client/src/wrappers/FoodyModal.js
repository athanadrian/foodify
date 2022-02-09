import styled from 'styled-components';

const Wrapper = styled.section`
  .modal-container {
    border-radius: 35px; //var(--borderRadius);;
    width: 100vm;
    height: 100vh;
    background: var(--red-dark);
    padding: 2rem;
    overflow: hidden;
    //box-shadow: var(--shadow-2);
    /* 
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-shadow: 0 5px 16px rgba(14, 124, 134, 0.2);
    background: var(--backgroundColor);
    color: var(--textColor);
    position: relative;
    z-index: 10;
    border-radius: var(--borderRadius); */
  }

  /* @media (min-width: 992px) {
    .modal-container {
      width: 800px;
      height: 550px;
    }
  }

  @media (min-width: 576px) {
    .modal-container {
      width: 600px;
      height: 400px;
    }
  }
  @media (max-width: 576px) {
    width: 400px;
    height: 300px;
  } */
`;
export default Wrapper;
