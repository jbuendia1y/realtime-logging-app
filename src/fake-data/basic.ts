export const randomNumber = (options: { min: number; max: number }) => {
  const min = Math.ceil(options.min);
  const max = Math.floor(options.max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArrayItem = <T = unknown>(array: Array<T>) => {
  const randomIdx = Math.floor(Math.random() * array.length);
  return array[randomIdx];
};
