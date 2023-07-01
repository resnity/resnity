export const mapClassInstancesToMapBy = <T extends object, K extends keyof T>(
  instances: T[] | undefined | null,
  property: K,
) => {
  if (instances === undefined || instances === null) return new Map<T[K], T>();
  const entries = instances.map((item) => [item[property], item] as const);
  return new Map<T[K], T>(entries);
};

export const extractMapKeys = <K, V>(map: Map<K, V>) => Array.from(map.keys());

export const extractMapValues = <K, V>(map: Map<K, V>) =>
  Array.from(map.values());
