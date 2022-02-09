import Wrapper from '../../wrappers/DashboardFormPage';
import {
  Alert,
  FormInput,
  FormTextArea,
  FormEnumSelect,
  Modal,
  MapModal,
} from '../../components';
import { useAppContext } from '../../context/appContext';
import { BsFillPinMapFill } from 'react-icons/bs';
import { useEffect } from 'react';

const AddFoody = () => {
  const {
    isEditing,
    isLoading,
    showAlert,
    showModal,
    title,
    village,
    remarks,
    foody,
    cost,
    status,
    cuisine,
    statusOptions,
    costOptions,
    foodyOptions,
    cuisineOptions,
    handleChange,
    displayAlert,
    createFoody,
    editFoody,
    clearValues,
    toggleModal,
    getGoogleApiKey,
  } = useAppContext();

  useEffect(() => {
    const fetchGoogleKey = async () => {
      await getGoogleApiKey();
    };
    fetchGoogleKey();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !village) {
      return displayAlert();
    }

    if (isEditing) {
      editFoody();
      return;
    }

    createFoody();
  };

  return (
    <>
      <Wrapper>
        <form className='form'>
          <h3>{`${isEditing ? 'Edit' : 'Add'} Foody`}</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            <FormInput
              name='title'
              type='text'
              value={title}
              labelText='title'
              handleChange={handleInputChange}
            />
            <FormInput
              name='village'
              type='text'
              value={village}
              labelText='village'
              handleChange={handleInputChange}
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
            <FormEnumSelect
              name='cuisine'
              value={cuisine}
              labelText='cuisine'
              handleChange={handleInputChange}
              list={cuisineOptions}
            />
            <FormEnumSelect
              name='foody'
              value={foody}
              labelText='foody type'
              handleChange={handleInputChange}
              list={foodyOptions}
            />
            <FormEnumSelect
              name='cost'
              value={cost}
              labelText='cost'
              handleChange={handleInputChange}
              list={costOptions}
            />
            <FormEnumSelect
              name='status'
              value={status}
              labelText='status'
              handleChange={handleInputChange}
              list={statusOptions}
            />
          </div>
          <div className='text-area'>
            <FormTextArea
              name='remarks'
              type='text'
              value={remarks}
              labelText='remarks'
              handleChange={handleInputChange}
            />
          </div>
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </form>
      </Wrapper>
      <div>
        <Modal open={showModal} onClose={toggleModal} center>
          <MapModal />
        </Modal>
      </div>
    </>
  );
};

export default AddFoody;
