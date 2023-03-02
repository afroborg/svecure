export type UnknownObject = Record<string, unknown>;
export type UnknownFunction = (...params: never[]) => unknown;
export type Promiseish<T> = T | Promise<T>;
