import { useEffect, useState } from 'react';

// Plungington Community Centre coordinates
// Brook Street, Preston, PR1 7NB
// 53°46'07.9"N 2°42'41.1"W
const position = [53.76886, -2.71142];

export default function LocationMap() {
  const [mapComponents, setMapComponents] = useState(null);
  const [leaflet, setLeaflet] = useState(null);

  useEffect(() => {
    // Dynamically import react-leaflet and leaflet only on client side
    Promise.all([
      import('react-leaflet'),
      import('leaflet')
    ]).then(([reactLeaflet, L]) => {
      // Fix for default marker icon issues in build setups
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      setMapComponents(reactLeaflet);
      setLeaflet(L);
    });
  }, []);

  // Show loading state while map components are loading
  if (!mapComponents) {
    return (
      <div style={{ height: '450px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
        <p style={{ color: '#6b7280' }}>Loading map...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = mapComponents;

  const handleGetDirections = () => {
    // Open Google Maps with directions to the venue
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '400px', width: '100%', flexShrink: 0 }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <strong>Plungington Community Centre</strong><br />
              Brook Street<br />
              Preston, PR1 7NB
            </Popup>
          </Marker>
        </MapContainer>
        <button
          onClick={handleGetDirections}
          style={{
            backgroundColor: '#020665',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '0 0 16px 16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s',
            width: '100%'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#01044b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#020665'}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
          </svg>
          Get Directions
        </button>
      </div>
    </>
  );
}
