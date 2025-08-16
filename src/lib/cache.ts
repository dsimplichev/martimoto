const cache = new Map<string, { value: any; timestamp: number }>();
const TTL = 60 * 60 * 1000; // 1 hour in milliseconds

export const set = (key: string, value: any) => {
  cache.set(key, { value, timestamp: Date.now() });
};

export const get = (key: string): any | null => {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }

  const isExpired = Date.now() - entry.timestamp > TTL;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.value;
};

export const clear = () => {
  cache.clear();
};
