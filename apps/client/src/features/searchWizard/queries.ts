import { queryOptions } from '@tanstack/react-query';

export const placesAutocompleteQueryOptions = (
  places: google.maps.PlacesLibrary | null,
  input: string,
) =>
  queryOptions({
    queryKey: ['places-autocomplete', input] as const,
    queryFn: async () => {
      const result =
        await places?.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
        });
      return result?.suggestions ?? [];
    },
    staleTime: 1000 * 60 * 1,
  });
