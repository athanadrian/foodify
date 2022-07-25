import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { mapStyles, libraries } from 'utils/map-data';
import ProfileIcon from 'assets/images/current-location.svg';
import HomeIcon from 'assets/images/home.svg';
import FoodyIcon from 'assets/images/foody.svg';
import { MAP_CENTER } from 'utils/constants';
import MapSearch from './MapSearch';
import MapLocate from './MapLocate';
import MapToggle from './MapToggle';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { useAppContext } from 'context/contexts/appContext';
import MapFoody from 'components/MapFoody';

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const MapFoodys = () => {
  const { foodys, googleApiKey, myLocation, getAllFoodys } = useFoodyContext();
  const { homeLocation } = useAppContext();
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleApiKey,
    libraries,
  });

  useEffect(() => {
    getAllFoodys();
    // eslint-disable-next-line
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const onUnmount = useCallback((map) => {
    mapRef.current = null;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps....';

  return (
    <>
      <MapToggle />
      <MapSearch panTo={panTo} />
      <MapLocate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={MAP_CENTER}
        zoom={9}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        <>
          {foodys.map((foody) => (
            <Marker
              key={foody?._id}
              icon={{
                url: FoodyIcon,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              position={{
                lat: foody?.location.lat,
                lng: foody?.location.lng,
              }}
              onClick={() => setSelected(foody)}
            />
          ))}
          {myLocation.loaded && (
            <div style={{ zIndex: -1 }}>
              <Marker
                icon={{
                  url: ProfileIcon,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(20, 20),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                position={{
                  lat: myLocation?.coordinates?.lat,
                  lng: myLocation?.coordinates?.lng,
                }}
              />
            </div>
          )}
          {homeLocation && (
            <div style={{ zIndex: -1 }}>
              <Marker
                icon={{
                  url: HomeIcon,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(20, 20),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                position={{
                  lat: homeLocation?.lat,
                  lng: homeLocation?.lng,
                }}
              />
            </div>
          )}
        </>
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.location.lat,
              lng: selected.location.lng,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <MapFoody map key={selected._id} {...selected} />
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

export default MapFoodys;
