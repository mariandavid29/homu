import { Map } from '@vis.gl/react-google-maps';
import type { Coordinates } from '@/client/shared/types';

export function ListingsMap({ initialCenter }: { initialCenter: Coordinates }) {
  return (
    <Map
      defaultZoom={13}
      defaultCenter={{
        lat: initialCenter.latitude,
        lng: initialCenter.longitude,
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
