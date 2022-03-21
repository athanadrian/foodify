import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Logo, FormInput, Alert, FormUsernameInput } from 'components';
import { useAppContext } from 'context/contexts/appContext';
import Wrapper from 'wrappers/RegisterPage';

const initialState = {
  username: '',
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const Register = () => {
  const navigate = useNavigate();
  const {
    user,
    signUser,
    isLoading,
    showAlert,
    displayAlert,
    checkUsernameAvailability,
    isUsernameAvailable,
    showUsernameAlert,
  } = useAppContext();

  const [values, setValues] = useState(initialState);

  const clearValues = () => {
    setValues((prev) => ({
      ...prev,
      username: '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    clearValues();
  };

  useEffect(() => {
    setValues(initialState);
  }, []);

  useEffect(() => {
    checkUsernameAvailability(values.username);
    // eslint-disable-next-line
  }, [values.username]);

  const handleSubmit = (e) => {
    const { username, name, email, password, isMember } = values;
    e.preventDefault();
    if (!password || !email || (!isMember && !username && !name)) {
      displayAlert();
      return;
    }
    const currentUser = {
      username,
      name,
      email,
      password,
    };
    if (isMember) {
      signUser({ endPoint: 'login', currentUser, alertText: 'Login.....' });
    } else {
      signUser({
        endPoint: 'register',
        currentUser,
        alertText: 'Registering.....',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <>
            <FormInput
              handleChange={handleChange}
              labelText='name'
              name='name'
              type='text'
              value={values.name}
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
                  {isUsernameAvailable ? (
                    <FaCheck color='teal' />
                  ) : (
                    <AiOutlineCloseCircle size={24} color='red' />
                  )}
                </>
              )}
            </div>
          </>
        )}
        <FormInput
          handleChange={handleChange}
          labelText='email'
          name='email'
          type='email'
          value={values.email}
        />
        <FormInput
          handleChange={handleChange}
          labelText='password'
          name='password'
          type='password'
          value={values.password}
        />
        <button
          className='btn btn-block'
          type='submit'
          disabled={isLoading || !isUsernameAvailable}
        >
          {values.isMember ? 'Login' : 'Register'}
        </button>
        <>
          {values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
          <button
            className='member-btn'
            type='button'
            onClick={handleToggleMember}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
          <p className='forgot-container'>
            <Link to='/forgot-password' className='forgot-btn'>
              forgot password ?
            </Link>
          </p>
        </>
      </form>
    </Wrapper>
  );
};

export default Register;
