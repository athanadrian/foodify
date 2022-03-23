import { useAppContext } from 'context/contexts/appContext';
import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineSave } from 'react-icons/ai';
import { BsFillPinMapFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { RiRoadMapLine } from 'react-icons/ri';
import Alert from '../Alert';
import { FormButton, FormInput, FormUsernameInput } from '../form-elements';

const UserForm = () => {
  const {
    user,
    homeLocation,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    toggleModal,
    setUserHomeCurrentLocation,
    checkUsernameAvailability,
    showUsernameAlert,
    isUsernameAvailable,
  } = useAppContext();

  const initialState = {
    name: user?.name,
    username: user?.username,
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
    const { username, name, email, lastName, home } = values;
    if (!username || !name || !email || !lastName || !home) {
      return displayAlert();
    }
    updateUser({
      username,
      name,
      email,
      lastName,
      home,
      location: homeLocation,
    });
  };
  useEffect(() => {
    if (user.username !== values.username) {
      checkUsernameAvailability(values.username);
    }
    // eslint-disable-next-line
  }, [values.username, user.username]);
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>user data</h3>
      {showAlert && <Alert />}
      <div className='form-center'>
        <FormInput
          name='name'
          type='text'
          value={values.name}
          labelText='name'
          handleChange={handleChange}
        />
        <div className='username'>
          <FormUsernameInput
            handleChange={handleChange}
            labelText='username'
            name='username'
            type='text'
            value={values.username}
            hasAlert={Boolean(showUsernameAlert)}
          />
          {values.username && (
            <>
              {isUsernameAvailable || user.username === values.username ? (
                <FaCheck color='teal' />
              ) : (
                <AiOutlineCloseCircle size={24} color='red' />
              )}
            </>
          )}
        </div>
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
          btnText='Pin Home on Map'
          className='map-btn'
        />
        <FormButton
          Icon={BsFillPinMapFill}
          onClick={() =>
            setUserHomeCurrentLocation({
              alertText: 'User home set to current location!',
            })
          }
          btnText='set home current position'
          className='current-btn'
        />
        <FormButton
          Icon={AiOutlineSave}
          type='submit'
          btnText={isLoading ? 'Please Wait...' : 'save user data'}
          disabled={isLoading}
          className='save-btn'
        />
      </div>
    </form>
  );
};

export default UserForm;
