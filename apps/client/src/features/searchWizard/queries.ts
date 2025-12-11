import { queryOptions } from '@tanstack/react-query';

export const createPlacesAutocompleteQueryOptions = (
  places: google.maps.PlacesLibrary | null,
  input: string,
  regionCode: string,
) =>
  queryOptions({
    queryKey: ['places-autocomplete', input, regionCode] as const,
    queryFn: async () => {
      const result =
        await places?.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          includedRegionCodes: [regionCode],
        });
      return result?.suggestions ?? [];
    },
    staleTime: 1000 * 60 * 1,
  });
