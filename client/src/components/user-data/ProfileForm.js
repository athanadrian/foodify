import { useProfileContext } from 'context/contexts/profileContext';
import { useEffect, useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import Alert from '../Alert';
import { FormButton, FormInput, FormTextArea } from '../form-elements';

const ProfileForm = () => {
  const {
    profile,
    showProfileAlert,
    isLoadingProfile,
    updateProfile,
    alertType,
    alertText,
  } = useProfileContext();
  const initialState = {
    bio: '',
    company: '',
    website: '',
    mobile: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: '',
  };
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      bio: profile?.bio || '',
      company: profile?.company || '',
      website: profile?.website || '',
      mobile: profile?.mobile || '',
      youtube: profile?.social?.youtube || '',
      twitter: profile?.social?.twitter || '',
      facebook: profile?.social?.facebook || '',
      instagram: profile?.social?.instagram || '',
    }));
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      bio,
      company,
      website,
      mobile,
      youtube,
      twitter,
      facebook,
      instagram,
    } = values;
    updateProfile({
      bio,
      company,
      website,
      mobile,
      youtube,
      twitter,
      facebook,
      instagram,
    });
  };
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>profile data</h3>
      {showProfileAlert && <Alert type={alertType} text={alertText} />}
      <div className='text-area'>
        <FormTextArea
          name='bio'
          type='text'
          value={values.bio}
          labelText='bio'
          handleChange={handleChange}
        />
      </div>
      <div className='form-center'>
        <FormInput
          handleChange={handleChange}
          labelText='company'
          name='company'
          type='text'
          value={values.company}
        />
        <FormInput
          name='website'
          type='text'
          value={values.website}
          labelText='website'
          handleChange={handleChange}
        />
        <FormInput
          name='mobile'
          type='text'
          value={values.mobile}
          labelText='mobile'
          handleChange={handleChange}
        />
        <FormInput
          handleChange={handleChange}
          labelText='instagram'
          name='instagram'
          type='text'
          value={values.instagram}
        />
        <FormInput
          name='twitter'
          type='text'
          value={values.twitter}
          labelText='twitter'
          handleChange={handleChange}
        />
        <FormInput
          name='facebook'
          type='text'
          value={values.facebook}
          labelText='facebook'
          handleChange={handleChange}
        />
        <FormInput
          name='youtube'
          type='text'
          value={values.youtube}
          labelText='youtube'
          handleChange={handleChange}
        />
        <FormButton
          Icon={AiOutlineSave}
          type='submit'
          btnText={isLoadingProfile ? 'Please Wait...' : 'save profile data'}
          disabled={isLoadingProfile}
          className='save-btn'
        />
      </div>
    </form>
  );
};

export default ProfileForm;
