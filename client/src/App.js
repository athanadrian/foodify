import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Error,
  Landing,
  Register,
  ForgotPassword,
  ResetPassword,
} from './pages';
import {
  DashboardLayout,
  AddFoody,
  AllFoodys,
  Profile,
  Stats,
  MyFoodys,
  Map,
} from './pages/dashboard';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<Register />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route
          exact
          path='/reset-password/:token'
          element={<ResetPassword />}
        />
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
          <Route path='map' element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
