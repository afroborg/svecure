/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Load as SkLoad, ServerLoad as SkServerLoad } from '@sveltejs/kit';
import type { Promiseish } from './utils';

export type Load = SkLoad<any, any, any, any, any>;
export type ServerLoad = SkServerLoad<any, any, any, any>;

type Callback<T1, R, T2 extends T1> = (...params: Parameters<T2>) => Promiseish<R>;

export type LoadCallback<T, R> = Callback<Load, R, T>;
export type VerifyHandler<T extends Load> = LoadCallback<T, boolean>;

export type ServerLoadCallback<T, R> = Callback<ServerLoad, R, T>;
export type ServerVerifyHandler<T extends ServerLoad> = ServerLoadCallback<T, boolean>;

export type VerifyOptions = {
	errorStatus?: number;
	errorMessage?: string;
};
