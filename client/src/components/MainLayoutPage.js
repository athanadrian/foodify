import { Navbar } from '.';
import Wrapper from 'wrappers/MainLayoutPage';

const MainLayoutPage = ({ children }) => {
  return (
    <Wrapper>
      <main className='dashboard-page'>
        <div>
          <Navbar publicView />
          {children}
        </div>
      </main>
    </Wrapper>
  );
};

export default MainLayoutPage;
