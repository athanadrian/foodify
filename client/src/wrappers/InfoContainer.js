import styled from 'styled-components';

const Wrapper = styled.section`
  .container-row {
    display: grid;
    row-gap: 2rem;
    padding-bottom: 2rem;
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--primary-100);
      color: var(--primary-500);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
    .blue {
      background: var(--blue-light);
      color: var(--blue-dark);
    }
  }
  @media (min-width: 768px) {
    .container-row {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .container-row {
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 1rem;
    }
  }
`;
export default Wrapper;
