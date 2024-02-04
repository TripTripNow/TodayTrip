import styles from './MainContent.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationIcon from '#/icons/icon-location.svg';
import { Activity } from '@/types/Actvity';
import ReviewList from '@/components/Activities/ReviewList/ReviewList';

const containerStyle = {
  width: '100%',
  height: '45em',
};

interface MainContentProps {
  data: Activity;
}

function MainContent({ data }: MainContentProps) {
  // 지도
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  });

  const [location, setLocation] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('/api/geocode', {
          params: {
            address: data.address,
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

  return (
    <div className={styles.leftContentContainer}>
      <hr className={style.hr} />

      <section className={styles.descriptionWrapper}>
        <h2 className={style.h2}>체험 설명</h2>
        <p className={styles.description}>{data.description}</p>
      </section>
      <hr className={style.hr} />

      <section className={styles.mapWrapper}>
        {isLoaded && location && (
          <GoogleMap mapContainerStyle={containerStyle} zoom={18} center={{ lat: location.lat, lng: location.lng }}>
            <MarkerF
              position={location}
              icon={{ url: '/images/img-mapMarker.png', scaledSize: new window.google.maps.Size(60, 70) }}
            />
            <InfoWindowF
              options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
              position={{ lat: location.lat, lng: location.lng }}
              zIndex={1}
            >
              <div>{data.address}</div>
            </InfoWindowF>
          </GoogleMap>
        )}
        <p className={styles.location}>
          <LocationIcon alt="지도 마커 아이콘" />
          {data.address}
        </p>
      </section>

      <hr className={style.hr} />
      <ReviewList totalRating={data.rating} />
    </div>
  );
}

export default MainContent;
