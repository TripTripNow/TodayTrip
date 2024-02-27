import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF, LoadScript } from '@react-google-maps/api';
import LocationIcon from '#/icons/icon-location.svg';
import styles from './Map.module.css';

interface MapProps {
  address: string;
  containerStyle: { width: string; height: string };
}

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true; // 청소 모드 플래그, 초기화를 수행하고 있는지 여부를 나타냄
    const isBrowser = typeof document !== 'undefined'; // 브라우저에서 실행 중인지 확인
    const isAlreadyLoaded = window.google && window.google.maps && document.querySelector('body.first-hit-completed');

    if (!isAlreadyLoaded && isBrowser) {
      if (window.google && !cleaningUp) {
        console.error('google api is already presented');
        return;
      }

      this.isCleaningUp().then(this.injectScript); // 초기화가 필요한 경우 스크립트를 주입
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true }); // 이미 로드된 경우 상태를 설정
    }
  }
}

const libraries = ['places'];

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
    <LoadScriptOnlyIfNeeded googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!} libraries={libraries as any}>
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
              <p>{address}</p>
            </InfoWindowF>
          </GoogleMap>
        )}
        <p className={styles.location}>
          <LocationIcon alt="지도 마커 아이콘" />
          {address}
        </p>
      </section>
    </LoadScriptOnlyIfNeeded>
  );
}

export default Map;
