import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState<string | undefined>('');
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address || '');

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
        setAddress(results[0].formatted_address || '');
      } else {
        setAddress('');
      }
    });

    // 클릭한 곳 마커
    setMarkerPosition(clickedPosition);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDQxCp9hTvKjInPrxjtDP8Kvyz4yGGX17o" libraries={['places']}>
      <div style={{ position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%', position: 'relative', zIndex: 0 }}
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
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Enter Address"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              width: 'calc(100% - 20px)',
              height: '40px',
              padding: '0 12px',
              boxSizing: 'border-box',
              border: '1px solid transparent',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
              zIndex: 1,
            }}
          />
        </Autocomplete>
      </div>
      <p style={{ zIndex: 0 }}>Selected Address: {address}</p>
    </LoadScript>
  );
};

export default MapContainer;
