export const objectToIterable = <
  T extends string | number | symbol,
  K = unknown
>(
  record: Record<T, K>,
  options?: { transformKey: (key: string) => T | undefined }
) => {
  return Object.keys(record).map((key) => {
    const wrapperKey =
      options?.transformKey(key) ?? (key as keyof typeof record);
    return { key: wrapperKey, value: record[wrapperKey] };
  });
};
