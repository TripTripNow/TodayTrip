import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import LocationIcon from '#/icons/icon-location.svg';
import styles from './Map.module.css';

interface MapProps {
  address: string;
  containerStyle: { width: string; height: string };
}

function Map({ address, containerStyle }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  });

  const [location, setLocation] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(String(address))}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&language=ko`;
        const { data } = await axios.get(url);
        const response = data?.results[0]?.geometry?.location;
        const { lat, lng } = response;
        setLocation({ lng, lat });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
  }, []);
  return (
    <section className={styles.mapWrapper}>
      {isLoaded && location && (
        <GoogleMap mapContainerStyle={containerStyle} zoom={18} center={{ lat: location.lat, lng: location.lng }}>
          <MarkerF
            position={location}
            icon={{ url: '/icons/icon-logoMarker.svg', scaledSize: new window.google.maps.Size(60, 70) }}
          />
          <InfoWindowF
            options={{ pixelOffset: new window.google.maps.Size(0, -70) }}
            position={{ lat: location.lat, lng: location.lng }}
            zIndex={1}
          >
            <div>{address}</div>
          </InfoWindowF>
        </GoogleMap>
      )}
      <p className={styles.location}>
        <LocationIcon alt="지도 마커 아이콘" />
        {address}
      </p>
    </section>
  );
}

export default Map;
