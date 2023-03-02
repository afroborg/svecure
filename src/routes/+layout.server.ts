import { createLoadVerifier } from '$lib';
import type { LayoutServerLoad } from './$types';

const isLoggedIn = createLoadVerifier<LayoutServerLoad>(() => {
	return true;
});

export const load = isLoggedIn(async () => {
	return {
		user: {
			name: 'John Doe'
		}
	};
});
