import { useQuery } from '@tanstack/react-query';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';
import { placesAutocompleteQueryOptions } from './queries';

interface UsePlacesAutocompleteOptions {
  debounceMs?: number;
  minLength?: number;
}

export const usePlacesAutocomplete = ({
  debounceMs = 300,
  minLength = 3,
}: UsePlacesAutocompleteOptions = {}) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebouncedValue(inputValue, debounceMs);
  const places = useMapsLibrary('places');

  const {
    data: suggestions = [],
    isLoading,
    error,
  } = useQuery({
    ...placesAutocompleteQueryOptions(places, debouncedValue),
    enabled: !!places && !!debouncedValue && debouncedValue.length >= minLength,
  });

  return {
    inputValue,
    setInputValue,
    suggestions,
    isLoading:
      isLoading ||
      (inputValue !== debouncedValue && inputValue.length >= minLength),
    error,
  };
};
