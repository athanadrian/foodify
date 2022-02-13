import { useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { BsFillPinMapFill } from 'react-icons/bs';
import { RiRoadMapLine } from 'react-icons/ri';
import {
  Alert,
  ChartsContainer,
  FormInput,
  MapModal,
  Modal,
  StatsContainer,
} from '../../components';
import FormButton from '../../components/form-elements/FormButton';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../wrappers/DashboardFormPage';
import StatsWrapper from '../../wrappers/StatsContainer';
const Profile = () => {
  const {
    user,
    homeLocation,
    showAlert,
    showModal,
    displayAlert,
    updateUser,
    isLoading,
    monthlyCreations,
    toggleModal,
    setUserCurrentLocation,
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
    updateUser({ name, email, lastName, home, location: homeLocation });
  };

  return (
    <>
      <div className='dashboard-page'>
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
              <FormInput
                name='home'
                type='text'
                value={values.home}
                labelText='home city'
                handleChange={handleChange}
              />
              <FormButton
                Icon={RiRoadMapLine}
                onClick={toggleModal}
                btnText='Pin it on Map!'
                className='map-btn'
              />
              <FormButton
                Icon={BsFillPinMapFill}
                onClick={() =>
                  setUserCurrentLocation({
                    alertText: 'User set to current location!',
                  })
                }
                btnText='use current position!'
                className='current-btn'
              />
              <FormButton
                Icon={AiOutlineSave}
                type='submit'
                btnText={isLoading ? 'Please Wait...' : 'save changes'}
                disabled={isLoading}
                className='save-btn'
              />
            </div>
          </form>
        </Wrapper>
      </div>
      <div className='dashboard-page'>
        <StatsWrapper>
          <h2 className='user-statistics'>My Creations</h2>
          <StatsContainer />
          {monthlyCreations.length > 0 && <ChartsContainer />}
        </StatsWrapper>
      </div>
      <div>
        <Modal open={showModal} onClose={toggleModal} center>
          <MapModal profile />
        </Modal>
      </div>
    </>
  );
};

export default Profile;
