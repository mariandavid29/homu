import { useNavigate, useSearch } from '@tanstack/react-router';
import { ListingsMap } from '../listingsMap/ListingsMap';

export function ListingsRoot() {
  const search = useSearch({ from: '/_app/listings/' });
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🗺️ Geocoding Result</h1>
      <div style={{ marginTop: '1rem' }}>
        <p>
          <strong>Lat:</strong> {search.location.latitude.toFixed(6)}
        </p>
        <p>
          <strong>Lng:</strong> {search.location.longitude.toFixed(6)}
        </p>
      </div>
      <div style={{ width: '100vw', height: '500px' }}>
        <ListingsMap
          initialCenter={{
            latitude: search.location.latitude,
            longitude: search.location.longitude,
          }}
        />
      </div>
    </div>
  );
}
