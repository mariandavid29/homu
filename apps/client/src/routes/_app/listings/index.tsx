import { createFileRoute } from '@tanstack/react-router';
import { Map, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import * as z from 'zod';

const listingsSearchSchema = z.object({
  listingType: z.string().optional(),
  location: z.string().optional(),
  propertyType: z.string().optional(),
  bedRooms: z.array(z.string()).optional(),
});

export const Route = createFileRoute('/_app/listings/')({
  validateSearch: listingsSearchSchema,
  component: RouteComponent,
});

const mockListings = [
  {
    id: 1,
    title: 'Apartment 1',
    price: 250000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    owner: 'John Smith',
    image:
      'https://www.shutterstock.com/image-photo/modern-apartment-building-residential-house-600nw-2657209289.jpg',
  },
  {
    id: 2,
    title: 'Apartment 2',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    owner: 'Sarah Johnson',
    image:
      'https://www.shutterstock.com/image-photo/modern-apartment-building-residential-house-600nw-2657209289.jpg',
  },
  {
    id: 3,
    title: 'Apartment 3',
    price: 180000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    owner: 'Mike Davis',
    image:
      'https://www.shutterstock.com/image-photo/modern-apartment-building-residential-house-600nw-2657209289.jpg',
  },
  {
    id: 4,
    title: 'Apartment 4',
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    owner: 'Emily Wilson',
    image:
      'https://www.shutterstock.com/image-photo/modern-apartment-building-residential-house-600nw-2657209289.jpg',
  },
  {
    id: 5,
    title: 'Apartment 5',
    price: 620000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    owner: 'David Brown',
    image:
      'https://www.shutterstock.com/image-photo/modern-apartment-building-residential-house-600nw-2657209289.jpg',
  },
];

function RouteComponent() {
  return <ListingsMap />;
}

function ListingsMap() {
  const { listingType, location, propertyType, bedRooms } = Route.useSearch();
  const geocodingLib = useMapsLibrary('geocoding');
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    const geocoder = geocodingLib && new geocodingLib.Geocoder();

    if (!geocoder || !location) return;

    void geocoder.geocode({ placeId: location }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const { lat, lng } = results[0].geometry.location;
        setCenter({
          lat: lat(),
          lng: lng(),
        });
      } else {
        console.error('Geocoding failed:', status);
      }
    });
  }, [location, geocodingLib]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* listings Panel */}
      <div
        style={{
          width: '50%',
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#f5f5f5',
        }}>
        <h1 style={{ marginTop: 0 }}>Listings</h1>

        {/* listing Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {mockListings.map((listing) => (
            <div
              key={listing.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                gap: '15px',
              }}>
              <img
                src={listing.image}
                alt={listing.title}
                style={{
                  width: '150px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
                  {listing.title}
                </h3>
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#2563eb',
                    margin: '0 0 8px 0',
                  }}>
                  ${listing.price.toLocaleString()}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                  {listing.bedrooms} bed • {listing.bathrooms} bath •{' '}
                  {listing.sqft} sqft
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                  <strong>Owner:</strong> {listing.owner}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* map Panel */}
      <div style={{ width: '50%', position: 'relative' }}>
        {center ?
          <Map
            defaultZoom={13}
            defaultCenter={center}
            style={{ width: '100%', height: '100%' }}
          />
        : <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              backgroundColor: '#e5e7eb',
            }}>
            <p>Select a location to view the map</p>
          </div>
        }
      </div>
    </div>
  );
}
