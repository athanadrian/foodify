import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-top-left-radius: var(--borderRadius);
  border-bottom-left-radius: var(--borderRadius);
  display: grid;
  border-right: 1px solid var(--grey-100);
  grid-template-rows: 1fr auto;

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

  .actions-container {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 420px) {
      flex-direction: column;
      align-items: flex-start;

      .detail-btn {
        margin-bottom: 1rem;
      }
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

  .google-link {
    color: var(--primary-800);
    ::after {
      content: 'Google Maps';
      position: relative;
      left: -7px;
    }
  }
  .google-link:hover {
    color: var(--primary-500);
    text-decoration: underline;
  }
  .google-icon {
    position: relative;
    left: -10px;
  }

  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
  }

  .header-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 120px;
    height: 30px;
  }
  .cost-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cost {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  .remarks-container {
    border-radius: var(--borderRadius);
    background-color: var(--grey-50);
    margin-top: 0.5rem;
  }
  .remarks-text {
    padding: 0.5rem 1rem;
    letter-spacing: var(--letterSpacing);
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
  .detail-btn {
    color: var(--blue-dark);
    background: var(--blue-light);
    margin-right: 0.5rem;
    height: 30px;
    @media (max-width: 992px) {
      width: unset;
    }
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
    color: var(--yellow-dark);
    background: #fcefc7;
  }
`;

export default Wrapper;
