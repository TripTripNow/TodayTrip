import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import styles from './MapContainer.module.css';
import { Control, FieldValues, useController } from 'react-hook-form';

// LoadScript 초기화 시키는 class
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

interface MapContainerProps {
  latlng?: { lat: number; lng: number } | null;
  name: string;
  control: Control<FieldValues>;
}

const libraries = ['places'];

function MapContainer({ latlng, control, name }: MapContainerProps) {
  const { field } = useController({ name, control });
  const value = field.value;

  const [inputValue, setInputValue] = useState<string>(value);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.56, lng: 126.98 });
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Autocomplete가 로드될 때 호출되는 함수
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  // 장소가 선택되었을 때 호출되는 함수
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      // setAddressData(place.formatted_address || '');

      if (place.geometry && place.geometry.location) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(newPosition);
        setMarkerPosition(newPosition);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newPosition }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const clickedAddress = results[0].formatted_address || '';
            setInputValue(clickedAddress);
            field.onChange(clickedAddress);
          }
        });
      }
    }
  };

  // 맵을 클릭했을 때 호출되는 함수
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
        // setAddressData(clickedAddress);
        field.onChange(clickedAddress);
        // 클릭한 곳의 주소를 input 칸에 보여주기
        if (inputRef.current) {
          setInputValue(clickedAddress);
        }
      }
      //  else {
      //   setAddressData('');
      // }
    });
    // 클릭한 곳 마커
    setMarkerPosition(clickedPosition);
  };

  // latlng이 변경될 때 실행되는 효과
  useEffect(() => {
    if (latlng) {
      setMapCenter({
        lat: latlng.lat,
        lng: latlng.lng,
      });
      setMarkerPosition({ lat: latlng.lat, lng: latlng.lng });
    }
  }, [latlng]);

  return (
    <LoadScriptOnlyIfNeeded googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!} libraries={libraries as any}>
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
                url: '/icons/icon-logoMarker.svg',
                scaledSize: new window.google.maps.Size(35, 60),
              }}
            />
          )}
        </GoogleMap>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className={styles.mapInputWrapper}>
          <input
            type="text"
            placeholder="주소를 입력해주세요"
            className={styles.mapInput}
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Autocomplete>
      </div>
    </LoadScriptOnlyIfNeeded>
  );
}

export default MapContainer;
