import React, { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';

export default function GoogleMap({ center, zoom = 12, markers = [], style = {} }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      // Using a free alternative for demo - you can replace with your Google Maps API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      script.onerror = () => {
        setLoading(false);
        console.error('Failed to load Google Maps');
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: center || { lat: 5.6037, lng: -0.1870 }, // Accra, Ghana
        zoom: zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add markers if provided
      markers.forEach((markerData) => {
        const marker = new window.google.maps.Marker({
          position: markerData.position,
          map: mapInstance,
          title: markerData.title,
          icon: markerData.icon || {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#E63946',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        });

        if (markerData.info) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: markerData.info,
          });
          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        }
      });

      setMap(mapInstance);
      setLoading(false);
    };

    loadGoogleMaps();
  }, [center, zoom, markers]);

  return (
    <div style={{ position: 'relative', ...style }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          ...style,
        }}
      />
    </div>
  );
}
