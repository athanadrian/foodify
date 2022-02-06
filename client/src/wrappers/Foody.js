import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  /* Preference */
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interested,
  .average {
    background: #e0e8f9;
    color: #647acb;
  }
  .unpublished,
  .expensive,
  .not-interested {
    color: #d66a6a;
    background: #ffeeee;
  }
  .visited,
  .cheap,
  .published {
    color: var(--grey-600);
    background: var(--primary-300);
  }

  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .header-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content-update {
    justify-content: flex-end;
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 120px;
    height: 30px;
  }

  .preference {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }

  .cost {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }

  footer {
    margin-top: 1.5rem;
  }
  .edit-btn,
  .delete-btn,
  .publish-btn,
  .unpublish-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
    margin: 0 0.5rem;
  }
  .publish-btn {
    color: var(--grey-900);
    background: var(--grey-200);
  }
  .unpublish-btn {
    color: var(--yellow-dark); //#e9b949;
    background: #fcefc7;
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
