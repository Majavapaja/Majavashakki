export const copy = <T>(x: T) =>
  JSON.parse(JSON.stringify(x)) as T;
