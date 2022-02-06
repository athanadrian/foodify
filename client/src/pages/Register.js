import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, FormInput, Alert } from '../components';
import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const Register = () => {
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, signUser } =
    useAppContext();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleSubmit = (e) => {
    const { name, email, password, isMember } = values;
    e.preventDefault();
    if (!password || !email || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = {
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
          <FormInput
            handleChange={handleChange}
            labelText='name'
            name='name'
            type='text'
            value={values.name}
          />
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
        <button className='btn btn-block' type='submit' disabled={isLoading}>
          {values.isMember ? 'Login' : 'Register'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
          <button
            className='member-btn'
            type='button'
            onClick={handleToggleMember}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
