import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import styles from './MapContainer.module.css';

interface MapContainerProps {
  setAddressData: Dispatch<SetStateAction<string | undefined>>;
}

function MapContainer({ setAddressData }: MapContainerProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState<string | undefined>('');
  const [mapCenter, setMapCenter] = useState({ lat: 37.56, lng: 126.98 });
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address || '');
      setAddressData(place.formatted_address || '');

      if (place.geometry && place.geometry.location) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(newPosition);
        setMarkerPosition(newPosition);
      }
    }
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    // 클릭한 곳의 좌표 얻기
    const clickedPosition = {
      lat: event.latLng?.lat() || 0,
      lng: event.latLng?.lng() || 0,
    };

    // 클릭한 곳 좌표를 기반으로 주소 얻기
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: clickedPosition }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const clickedAddress = results[0].formatted_address || '';
        setAddress(clickedAddress);
        setAddressData(clickedAddress);
        // 클릭한 곳의 주소를 input 칸에 보여주기
        if (inputRef.current) {
          inputRef.current.value = clickedAddress;
        }
      } else {
        setAddress('');
        setAddressData('');
      }
    });

    // 클릭한 곳 마커
    setMarkerPosition(clickedPosition);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDQxCp9hTvKjInPrxjtDP8Kvyz4yGGX17o" libraries={['places']}>
      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%', position: 'relative', zIndex: 1, borderRadius: '4px' }}
          zoom={17.5}
          center={mapCenter}
          onClick={onMapClick}
        >
          {markerPosition && (
            <Marker
              position={markerPosition}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
        </GoogleMap>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className={styles.mapInputWrapper}>
          <input type="text" placeholder="주소를 입력해주세요" className={styles.mapInput} ref={inputRef} />
        </Autocomplete>
      </div>
    </LoadScript>
  );
}

export default MapContainer;