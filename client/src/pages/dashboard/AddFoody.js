import { BsFillPinMapFill } from 'react-icons/bs';
import { RiRoadMapLine } from 'react-icons/ri';
import Wrapper from 'wrappers/DashboardFormPage';
import {
  Alert,
  FormInput,
  FormTextArea,
  FormEnumSelect,
  FormButton,
  Modal,
  MapModal,
} from 'components';
import { useFoodyContext } from 'context/contexts/foodyContext';

const AddFoody = () => {
  const {
    isEditing,
    isFoodyLoading,
    showAlert,
    alertText,
    alertType,
    showModal,
    title,
    village,
    phone,
    remarks,
    menu,
    cost,
    status,
    cuisine,
    type,
    statusOptions,
    costOptions,
    menuOptions,
    cuisineOptions,
    typeOptions,
    handleChange,
    displayAlert,
    createFoody,
    editFoody,
    clearValues,
    toggleModal,
    setFoodyCurrentLocation,
  } = useFoodyContext();

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
            {showAlert && <Alert type={alertType} text={alertText} />}
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
              <FormInput
                name='phone'
                type='text'
                value={phone}
                labelText='phone'
                handleChange={handleInputChange}
              />
              <FormButton
                Icon={RiRoadMapLine}
                onClick={toggleModal}
                btnText='Pin Foody on Map'
                className='map-btn'
              />
              <FormButton
                Icon={BsFillPinMapFill}
                onClick={() =>
                  setFoodyCurrentLocation({
                    alertText: 'Foody set to current location!',
                  })
                }
                btnText='set foody current position'
                className='current-btn'
              />
              <FormEnumSelect
                name='type'
                value={type}
                labelText='Preferable'
                handleChange={handleInputChange}
                list={typeOptions}
              />
              <FormEnumSelect
                name='cuisine'
                value={cuisine}
                labelText='cuisine'
                handleChange={handleInputChange}
                list={cuisineOptions}
              />
              <FormEnumSelect
                name='menu'
                value={menu}
                labelText='menu type'
                handleChange={handleInputChange}
                list={menuOptions}
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
                disabled={isFoodyLoading}
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
