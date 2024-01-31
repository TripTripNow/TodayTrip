import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    // stylers: [{ visibility: 'off' }],
  },
];
function Test2() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  });

  const [location, setLocation] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('/api/location', {
          params: {
            address: 'EPITA - School of Engineering and Computer Science 14-16 Rue Voltaire, 94270 Le Kremlin-Bicêtre',
          },
        });

        const { lat, lng } = response.data;
        setLocation({ lng, lat });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
  }, []);

  return isLoaded && location ? (
    <GoogleMap mapContainerStyle={containerStyle} zoom={18} center={{ lat: location.lat, lng: location.lng }}>
      <MarkerF position={location} />
      {/* <InfoWindowF position={{ lat: location.lat, lng: location.lng }} zIndex={1}></InfoWindowF> */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Test2;
