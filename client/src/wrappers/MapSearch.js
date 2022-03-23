import styled from 'styled-components';

const Wrapper = styled.div`
  .search {
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 300px;
    z-index: 10;
  }
  [data-reach-combobox-popover] {
    border: 0;
  }
  .search input {
    padding: 0.5rem;
  }
  @media (max-width: 440px) {
    .search {
      width: 60%;
    }
  }
`;
export default Wrapper;
