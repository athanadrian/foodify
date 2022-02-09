import { useCallback, useRef, useState } from 'react';
import Wrapper from '../wrappers/InfoWindow';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { mapStyles, libraries } from '../utils/map-data';
import { useAppContext } from '../context/appContext';
import ProfileIcon from '../assets/images/profile.svg';
import FoodyIcon from '../assets/images/foody.svg';
import CoordinateInfo from './CoordinateInfo';
import { FiMapPin } from 'react-icons/fi';
const containerStyle = {
  width: '450px',
  height: '100vh',
};

const center = {
  lat: 34.9174152,
  lng: 32.3907001,
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const zoom = 8;

const MapModal = ({ profile }) => {
  const {
    googleApiKey,
    addFoodyLocation,
    addUserLocation,
    userLocation,
    location,
    showInfoWindow,
    closeInfoWindow,
    openInfoWindow,
  } = useAppContext();
  const { current: initialLocation } = useRef(
    profile ? userLocation : location
  );

  const showResetButton =
    userLocation !== initialLocation && location !== initialLocation;
  const { isLoaded, loadError } = useJsApiLoader({
    //id: 'google-map-script',
    googleMapsApiKey: googleApiKey,
    libraries,
  });
  let entityMarker = {};
  entityMarker = profile
    ? {
        lat: userLocation.lat,
        lng: userLocation.lng,
        icon: ProfileIcon,
        text: 'Profile',
      }
    : {
        lat: location.lat,
        lng: location.lng,
        icon: FoodyIcon,
        text: 'Foody',
      };

  //console.log('KEY', googleApiKey.toString());

  const [map, setMap] = useState(null);

  const resetCoordinates = () => {
    profile
      ? addUserLocation(initialLocation)
      : addFoodyLocation(initialLocation);
  };
  const markLocation = (e) => {
    openInfoWindow();
    const markedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    profile
      ? addUserLocation(markedLocation)
      : addFoodyLocation(markedLocation);
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps....';

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
      onClick={markLocation}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker
          icon={{
            url: entityMarker.icon,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          draggable
          position={{
            lat: entityMarker.lat,
            lng: entityMarker.lng,
          }}
          onDragEnd={markLocation}
          onLoad={openInfoWindow}
        />
        {showInfoWindow && (
          <InfoWindow
            position={{
              lat: entityMarker.lat,
              lng: entityMarker.lng,
            }}
            onCloseClick={closeInfoWindow}
          >
            <Wrapper>
              <div className='info-window-wrapper'>
                <div className='info-window-image'>
                  <img src={entityMarker.icon} alt={entityMarker.text} />
                </div>
                <div className='info-window-content'>
                  <h4>{!showResetButton ? 'Registered' : 'Selected'}</h4>
                  <CoordinateInfo
                    tooltip='Latitude'
                    coord='lat: '
                    icon={<FiMapPin size={20} />}
                    text={entityMarker.lat.toFixed(5)}
                  />
                  <CoordinateInfo
                    tooltip='Longitude'
                    coord='lng: '
                    icon={<FiMapPin size={20} />}
                    text={entityMarker.lng.toFixed(5)}
                  />
                  {showResetButton && (
                    <button
                      type='button'
                      className='btn btn-block reset-btn'
                      onClick={resetCoordinates}
                    >
                      reset
                    </button>
                  )}
                </div>
              </div>
            </Wrapper>
          </InfoWindow>
        )}
      </>
    </GoogleMap>
  );
};

export default MapModal;
