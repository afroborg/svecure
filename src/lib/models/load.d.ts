/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Load as SkLoad, ServerLoad as SkServerLoad } from '@sveltejs/kit';
import type { Promiseish } from './utils';

type Load = SkLoad<any, any, any, any, any>;
type ServerLoad = SkServerLoad<any, any, any, any>;

type Callback<T1, R, T2 extends T1> = (...params: Parameters<T2>) => Promiseish<R>;

type ClientLoadCallback<T, R> = Callback<Load, R, T>;
type ClientVerifyHandler<T extends Load> = LoadCallback<T, boolean>;

type ServerLoadCallback<T, R> = Callback<ServerLoad, R, T>;
type ServerVerifyHandler<T extends ServerLoad> = ServerLoadCallback<T, boolean>;

type ClientOrServer<T, Client, Server> = T extends Load
	? Client
	: T extends ServerLoad
	? Server
	: never;

export type VerifyHandler<T> = ClientOrServer<T, ClientVerifyHandler<T>, ServerVerifyHandler<T>>;

export type LoadCallback<T, R> = ClientOrServer<
	T,
	ClientLoadCallback<T, R>,
	ServerLoadCallback<T, R>
>;
