import { createLoadVerifier } from '$lib';
import type { Load, ServerLoad } from '@sveltejs/kit';
import { describe, it, expect } from 'vitest';

type ClientTestLoad = Load<Record<string, never>, Record<string, unknown>>;
type ServerTestLoad = ServerLoad<Record<string, never>, Record<string, unknown>>;

describe('verifier', () => {
	it('is returnts a function', () => {
		const verifyWrapper = createLoadVerifier<ClientTestLoad>(() => true);
		expect(verifyWrapper).toBeInstanceOf(Function);
	});
});

describe('load', () => {
	it('can do simple load', async () => {
		const props = {
			name: 'John Doe'
		};

		const withVerify = createLoadVerifier<ClientTestLoad>(() => true);

		const load = withVerify(() => props);
		expect(load).toBeInstanceOf(Function);

		const res = await load({} as never);
		expect(res).toStrictEqual(props);
	});

	it('passes data properly', async () => {
		const props = {
			name: 'John Doe'
		};

		const onlyVerified = createLoadVerifier<ClientTestLoad>(({ data }) => {
			return Boolean(data.isVerified);
		});

		const load = onlyVerified(() => props);
		const res = await load({ data: { isVerified: true } } as never);
		expect(res).toStrictEqual(props);

		const onlyUnverified = createLoadVerifier<ClientTestLoad>((props) => {
			return !props.data.isVerified;
		});

		const load2 = onlyUnverified(() => props);
		const res2 = load2({ data: { isVerified: true } } as never);
		expect(() => res2).rejects.toThrowError();
	});

	it('passess cookies properly', async () => {
		const props = {
			name: 'John Doe'
		};

		const onlyVerified = createLoadVerifier<ServerTestLoad>(({ cookies }) => {
			return Boolean(cookies.get('isVerified'));
		});

		const load = onlyVerified(() => props);
		const res = await load({ cookies: { get: () => true } } as never);
		expect(res).toStrictEqual(props);

		const onlyUnverified = createLoadVerifier<ServerTestLoad>((props) => {
			return !props.cookies.get('isVerified');
		});

		const load2 = onlyUnverified(() => props);
		const res2 = load2({ cookies: { get: () => true } } as never);
		expect(() => res2).rejects.toThrowError();
	});
});
