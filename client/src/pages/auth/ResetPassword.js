import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Logo, FormInput, Alert } from 'components';
import { useAppContext } from 'context/contexts/appContext';
import Wrapper from 'wrappers/RegisterPage';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { isLoading, isSuccess, showAlert, displayAlert, resetPassword } =
    useAppContext();
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      return displayAlert();
    }
    resetPassword({
      token,
      password,
      alertText: 'Password Updated',
    });
    setPassword('');
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>Enter new Password</h3>
        {showAlert && <Alert />}
        <FormInput
          handleChange={(e) => setPassword(e.target.value)}
          labelText='password'
          name='password'
          type='password'
          value={password}
        />
        <button className='btn btn-block' type='submit' disabled={isLoading}>
          Submit new password
        </button>
        <p>
          Return to Sign page ?
          <Link className='member-btn' to='/register'>
            {' '}
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default ResetPassword;
