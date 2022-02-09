import { useState } from 'react';
import { BsFillPinMapFill } from 'react-icons/bs';
import {
  Alert,
  ChartsContainer,
  FormInput,
  MapModal,
  Modal,
  StatsContainer,
} from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../wrappers/DashboardFormPage';
import StatsWrapper from '../../wrappers/StatsContainer';
const Profile = () => {
  const {
    user,
    userLocation,
    showAlert,
    showModal,
    displayAlert,
    updateUser,
    isLoading,
    monthlyCreations,
    toggleModal,
  } = useAppContext();

  const initialState = {
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    home: user?.home,
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, home } = values;
    if (!name || !email || !lastName || !home) {
      return displayAlert();
    }
    updateUser({ name, email, lastName, home, location: userLocation });
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
              labelText='last name'
              handleChange={handleChange}
            />
            <div className='btn-container'>
              <FormInput
                name='home'
                type='text'
                value={values.home}
                labelText='home city'
                handleChange={handleChange}
              />
              <div className='form-row'>
                <label title='Pin it on Map!' className='form-label icon'>
                  <BsFillPinMapFill />
                </label>
                <button
                  type='button'
                  className='btn btn-block map-btn'
                  onClick={toggleModal}
                >
                  Pin it on Map!
                </button>
              </div>
            </div>
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
      <div>
        <Modal open={showModal} onClose={toggleModal} center>
          <MapModal profile />
        </Modal>
      </div>
    </>
  );
};

export default Profile;
