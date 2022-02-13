import { useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { libraries } from '../../utils/map-data';
import { useAppContext } from '../../context/appContext';
import MapSearch from './MapSearch';
import MapLocate from './MapLocate';

const MapContainer = ({
  mapContainerStyle,
  options,
  zoom,
  center,
  children,
}) => {
  const { googleApiKey } = useAppContext();

  const { isLoaded, loadError } = useJsApiLoader({
    //id: 'google-map-script',
    googleMapsApiKey: googleApiKey,
    libraries,
  });

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
      <MapSearch panTo={panTo} />
      <MapLocate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {children}
      </GoogleMap>
    </>
  );
};

export default MapContainer;
