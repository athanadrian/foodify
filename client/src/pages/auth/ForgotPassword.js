import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, FormInput, Alert } from 'components';
import { useAppContext } from 'context/appContext';
import Wrapper from 'wrappers/RegisterPage';

const ForgetPassword = () => {
  const { isLoading, showAlert, displayAlert, forgotPassword } =
    useAppContext();
  const [email, setEmail] = useState('atanadev@gmail.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return displayAlert();
    }
    forgotPassword({
      email,
      alertText: 'Check your email for reset link',
    });
    setEmail('');
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>Reset your Password</h3>
        {showAlert && <Alert />}
        <FormInput
          handleChange={(e) => setEmail(e.target.value)}
          labelText='email'
          name='email'
          type='email'
          value={email}
        />
        <button className='btn btn-block' type='submit' disabled={isLoading}>
          Reset
        </button>
        <p>
          Return to register / login
          <Link className='member-btn' to='/register'>
            {' '}
            page
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default ForgetPassword;
