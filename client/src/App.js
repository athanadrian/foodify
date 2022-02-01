import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error, Landing, Register } from './pages';
import {
  DashboardLayout,
  AddFoody,
  AllFoodys,
  Profile,
  Stats,
  MyFoodys,
} from './pages/dashboard';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-foodys' element={<AllFoodys />} />
          <Route path='my-foodys' element={<MyFoodys />} />
          <Route path='add-foody' element={<AddFoody />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
