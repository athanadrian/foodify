import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
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
      letter-spacing: 0;
      text-transform: capitalize;
      line-height: 1.25;
      font-size: 1.75rem;
      margin-bottom: 0;
      font-weight: 700;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
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
    .red {
      background: var(--red-light);
      color: var(--red-dark);
    }
    .grey {
      background: var(--grey-100);
      color: var(--grey-700);
    }
  }
`;
export default Wrapper;
