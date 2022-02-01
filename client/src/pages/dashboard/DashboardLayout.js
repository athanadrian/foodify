import { Outlet } from 'react-router-dom';
import { Navbar, SmallSidebar, BigSidebar } from '../../components';
import Wrapper from '../../wrappers/DashboardLayoutPage';

const DashboardLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <BigSidebar />
        <SmallSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default DashboardLayout;
