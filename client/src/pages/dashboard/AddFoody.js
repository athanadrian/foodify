import Wrapper from '../../wrappers/DashboardFormPage';
import {
  Alert,
  FormInput,
  FormTextArea,
  FormEnumSelect,
  FormButton,
  Modal,
  MapModal,
} from '../../components';
import { useAppContext } from '../../context/appContext';
import { BsFillPinMapFill } from 'react-icons/bs';
import { RiRoadMapLine } from 'react-icons/ri';

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
    setFoodyCurrentLocation,
  } = useAppContext();

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
      <div className='dashboard-page'>
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
              <FormButton
                Icon={RiRoadMapLine}
                onClick={toggleModal}
                btnText='Pin it on Map!'
                className='map-btn'
              />
              <FormButton
                Icon={BsFillPinMapFill}
                onClick={() =>
                  setFoodyCurrentLocation({
                    alertText: 'Foody set to current location!',
                  })
                }
                btnText='set current position!'
                className='current-btn'
              />
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
              <FormButton
                type='submit'
                onClick={handleSubmit}
                btnText='submit'
                className='submit-btn'
                disabled={isLoading}
              />
              <FormButton
                onClick={(e) => {
                  e.preventDefault();
                  clearValues();
                }}
                btnText='clear'
                className='clear-btn'
              />
            </div>
          </form>
        </Wrapper>
        <div>
          <Modal open={showModal} onClose={toggleModal} center>
            <MapModal />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AddFoody;
