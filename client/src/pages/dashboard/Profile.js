import { useState } from 'react';
import {
  Alert,
  ChartsContainer,
  FormInput,
  StatsContainer,
} from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../wrappers/DashboardFormPage';
import StatsWrapper from '../../wrappers/StatsContainer';
const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    monthlyCreations,
  } = useAppContext();
  const initialState = {
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    location: user?.location,
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = values;
    if (!name || !email || !lastName || !location) {
      return displayAlert();
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <>
      <Wrapper>
        <form className='form' onSubmit={handleSubmit}>
          <h3>profile</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            <FormInput
              name='name'
              type='text'
              value={values.name}
              labelText='name'
              handleChange={handleChange}
            />
            <FormInput
              name='email'
              type='text'
              value={values.email}
              labelText='email'
              handleChange={handleChange}
            />
            <FormInput
              name='lastName'
              type='text'
              value={values.lastName}
              labelText='lastName'
              handleChange={handleChange}
            />
            <FormInput
              name='location'
              type='text'
              value={values.location}
              labelText='location'
              handleChange={handleChange}
            />
            <button
              className='btn btn-block'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Please Wait...' : 'save changes'}
            </button>
          </div>
        </form>
      </Wrapper>
      <StatsWrapper>
        <h2 className='user-statistics'>My Creations</h2>
        <StatsContainer />
        {monthlyCreations.length > 0 && <ChartsContainer />}
      </StatsWrapper>
    </>
  );
};

export default Profile;
