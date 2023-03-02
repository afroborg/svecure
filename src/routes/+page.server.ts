import { createLoadVerifier } from '$lib/handlers/auth';
import type { PageServerLoad } from './$types';

const verifier = createLoadVerifier<PageServerLoad>(() => {
	return true;
});

export const load = verifier(async () => {
	return {
		props: 'test',
		abc: 123
	};
});
