import { Select } from '@mantine/core';
import { usePlacesAutocomplete } from '../../hooks';
import type { SelectProps } from '@mantine/core';

type LocationSelectProps = Omit<
  SelectProps,
  'data' | 'searchable' | 'onSearchChange'
>;

export function LocationSelect(props: LocationSelectProps) {
  const { inputValue, setInputValue, suggestions, isLoading } =
    usePlacesAutocomplete({
      debounceMs: 300,
      minLength: 3,
    });

  const data = suggestions
    .filter(
      (
        suggestion,
      ): suggestion is typeof suggestion & {
        placePrediction: NonNullable<typeof suggestion.placePrediction>;
      } => !!suggestion.placePrediction,
    )
    .map((suggestion) => ({
      value: suggestion.placePrediction.placeId,
      label: suggestion.placePrediction.text.text,
    }));

  return (
    <Select
      placeholder='Location'
      size='md'
      data={data}
      searchable
      searchValue={inputValue}
      onSearchChange={setInputValue}
      nothingFoundMessage={
        isLoading ? 'Loading...'
        : inputValue.length < 3 ?
          'Type at least 3 characters'
        : 'No locations found'
      }
      clearable
      {...props}
    />
  );
}
