import { useFoodyContext } from 'context/contexts/foodyContext';
import CurrentIcon from 'assets/images/current-location.svg';
import HomeIcon from 'assets/images/home.svg';
import Wrapper from 'wrappers/MapLocate';
import { useAppContext } from 'context/contexts/appContext';

const MapLocate = ({ panTo }) => {
  const { myLocation } = useFoodyContext();
  const { homeLocation } = useAppContext();
  return (
    <Wrapper>
      <div className='btn-container'>
        <button
          title='Show my location'
          className='btn-cover locate-current'
          onClick={() =>
            panTo({
              lat: myLocation.coordinates.lat,
              lng: myLocation.coordinates.lng,
            })
          }
        >
          <img src={CurrentIcon} alt='compass' />
        </button>
        <button
          title='Show home location'
          className='btn-cover locate-home'
          onClick={() =>
            panTo({
              lat: homeLocation.lat,
              lng: homeLocation.lng,
            })
          }
        >
          <img src={HomeIcon} alt='home' />
        </button>
      </div>
    </Wrapper>
  );
};

export default MapLocate;
