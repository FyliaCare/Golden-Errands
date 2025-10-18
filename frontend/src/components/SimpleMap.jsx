// Simple fallback map component using Leaflet (open source, no API key needed)
import React, { useEffect, useRef } from 'react';

export default function SimpleMap({ locations = [], style = {} }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    const loadLeaflet = () => {
      if (window.L) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.L) return;

      // Center on Ghana (Accra)
      const map = window.L.map(mapRef.current).setView([5.6037, -0.1870], 7);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Default locations if none provided
      const defaultLocations = locations.length > 0 ? locations : [
        {
          name: 'Accra Office',
          lat: 5.6037,
          lng: -0.1870,
          address: 'Golden Errands HQ, Accra',
        },
        {
          name: 'Kumasi Branch',
          lat: 6.6884,
          lng: -1.6244,
          address: 'Golden Errands, Kumasi',
        },
        {
          name: 'Takoradi Branch',
          lat: 4.8974,
          lng: -1.7503,
          address: 'Golden Errands, Takoradi',
        },
      ];

      // Custom marker icon
      const customIcon = window.L.divIcon({
        html: `<div style="
          width: 32px;
          height: 32px;
          background: #E63946;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        ">🚀</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      // Add markers
      defaultLocations.forEach((location) => {
        const marker = window.L.marker([location.lat, location.lng], {
          icon: customIcon,
        }).addTo(map);

        marker.bindPopup(`
          <div style="text-align: center;">
            <strong style="color: #E63946; font-size: 16px;">${location.name}</strong><br/>
            <span style="color: #666;">${location.address}</span><br/>
            <div style="margin-top: 8px;">
              <a href="tel:0256039212" style="color: #FFB703; text-decoration: none;">
                📞 0256039212
              </a>
            </div>
          </div>
        `);
      });
    };

    loadLeaflet();

    return () => {
      if (mapRef.current && mapRef.current._leaflet_id) {
        mapRef.current.remove();
      }
    };
  }, [locations]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '400px',
        borderRadius: 16,
        overflow: 'hidden',
        border: '2px solid #f0f0f0',
        ...style,
      }}
    />
  );
}
