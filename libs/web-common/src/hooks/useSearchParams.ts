import { useMemo } from 'react';

export const useSearchParams = <T = Record<string, string>>() => {
  const urlSearchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );
  const searchParamsObject = useMemo(
    () =>
      Array.from(urlSearchParams.entries()).reduce<T>(
        (acc, entry) => ({ ...acc, [entry[0]]: entry[1] }),
        {} as T,
      ),
    [urlSearchParams],
  );

  return searchParamsObject;
};
