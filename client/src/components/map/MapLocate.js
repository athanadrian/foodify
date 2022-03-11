import { useFoodyContext } from 'context/contexts/foodyContext';
import Compass from 'assets/images/compass.svg';
import Wrapper from 'wrappers/MapLocate';

const MapLocate = ({ panTo }) => {
  const { myLocation } = useFoodyContext();
  return (
    <Wrapper>
      <button
        title='Show my location'
        className='btn-cover locate'
        onClick={() =>
          panTo({
            lat: myLocation.coordinates.lat,
            lng: myLocation.coordinates.lng,
          })
        }
      >
        <img src={Compass} alt='compass' />
      </button>
    </Wrapper>
  );
};

export default MapLocate;
