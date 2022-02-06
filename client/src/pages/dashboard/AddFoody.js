import Wrapper from '../../wrappers/DashboardFormPage';
import {
  Alert,
  FormInput,
  FormTextArea,
  FormSelect,
  FormEnumSelect,
} from '../../components';
import { useAppContext } from '../../context/appContext';

const AddFoody = () => {
  const {
    isEditing,
    isLoading,
    showAlert,
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
        {/* btn container */}
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
  );
};

export default AddFoody;
