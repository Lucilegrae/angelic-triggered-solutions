export type NextParams<T extends string> = {
  params: Promise<{ [K in T]: string }>;
};
