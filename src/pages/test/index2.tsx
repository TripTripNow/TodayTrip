import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import styles from './Test.module.css';

import { Field, Form, Formik } from 'formik';
export const DEFAULT_DISTANCE_IN_KM = '100';

const configureSchema = Yup.object().shape({
  city: Yup.string().required('Required'),
});

async function getLatLonForCity(city: string) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
  const geocodeResponse = await fetch(geocodeUrl);
  const geocodeData = await geocodeResponse.json();
  const { lat, lng } = geocodeData.results[0].geometry.location;
  return { lon: lng, lat };
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

export type Place = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

function Test() {
  const cityRef = useRef(undefined);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const [places, setPlaces] = useState<Place[]>([
    { name: '위워크', address: '서울특별시 중구 삼일대로 343', latitude: 37.56, longitude: 126.98 },
  ]);
  const [position, setPosition] = useState({ lat: places[0].latitude, lon: places[0].longitude });
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setPlaces(() => [...places]);
    }, 1000);
  }, []);
  return (
    <div>
      <Formik
        initialValues={{ city: 'Seoul' }}
        validationSchema={configureSchema}
        onSubmit={async (formData) => {
          const { lat, lon } = await getLatLonForCity(formData.city);
          setPosition({ lat, lon });
        }}
      >
        {({ errors }) => (
          <Form>
            <div className={styles.searchWrapper}>
              <div>
                <Field
                  innerRef={cityRef}
                  className={styles.searchInput}
                  placeholder="을지로 위워크"
                  name="city"
                  type="text"
                />
              </div>

              <button type="submit" className={styles.searhButton}>
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: position.lat, lng: position.lon }} zoom={17}>
          {places.map((place) => (
            <MarkerF
              key={`${place.address}-${place.name}-${place.latitude}-${place.longitude}`}
              onClick={() => {
                place === selectedPlace ? setSelectedPlace(undefined) : setSelectedPlace(place);
              }}
              position={{ lat: place.latitude, lng: place.longitude }}
            />
          ))}
          {selectedPlace && (
            <InfoWindowF
              position={{ lat: selectedPlace?.latitude, lng: selectedPlace?.longitude }}
              zIndex={1}
              onCloseClick={() => setSelectedPlace(undefined)}
            >
              <div>
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.address}</p>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      )}
    </div>
  );
}
export default Test;
