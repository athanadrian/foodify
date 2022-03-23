import { useCallback, useRef } from 'react';
import Wrapper from 'wrappers/InfoWindow';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { FiMapPin } from 'react-icons/fi';
import { mapStyles, libraries } from 'utils/map-data';
import ProfileIcon from 'assets/images/profile.svg';
import FoodyIcon from 'assets/images/foody.svg';
import CoordinateInfo from '../CoordinateInfo';
import { MAP_CENTER, MAP_ZOOM } from 'utils/constants';
import MapSearch from './MapSearch';
import MapLocate from './MapLocate';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { useAppContext } from 'context/contexts/appContext';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const MapModal = ({ profile }) => {
  const {
    googleApiKey,
    addFoodyLocation,
    addUserLocation,
    foodyLocation,
    showInfoWindow,
    closeInfoWindow,
    openInfoWindow,
  } = useFoodyContext();
  const { homeLocation } = useAppContext();

  const { current: initialLocation } = useRef(
    profile ? homeLocation : foodyLocation
  );

  const showResetButton =
    homeLocation !== initialLocation && foodyLocation !== initialLocation;
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleApiKey,
    libraries,
  });
  let entityMarker = {};
  entityMarker = profile
    ? {
        lat: homeLocation?.lat,
        lng: homeLocation?.lng,
        icon: ProfileIcon,
        text: 'Profile',
      }
    : {
        lat: foodyLocation?.lat,
        lng: foodyLocation?.lng,
        icon: FoodyIcon,
        text: 'Foody',
      };

  const resetCoordinates = () => {
    profile
      ? addUserLocation(initialLocation)
      : addFoodyLocation(initialLocation);
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const markLocation = (e) => {
    openInfoWindow();
    const markedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    panTo(markedLocation);
    profile
      ? addUserLocation(markedLocation, 'User home location registered!')
      : addFoodyLocation(markedLocation);
  };

  const onUnmount = useCallback((map) => {
    mapRef.current = null;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps....';

  return (
    <>
      <MapSearch panTo={panTo} />
      <MapLocate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onClick={markLocation}
      >
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
    </>
  );
};

export default MapModal;
