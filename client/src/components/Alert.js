import { useAppContext } from 'context/contexts/appContext';

const Alert = ({ type, text }) => {
  const { alertType, alertText } = useAppContext();

  return (
    <div className={`alert alert-${alertType || type}`}>
      {alertText || text}
    </div>
  );
};

export default Alert;
