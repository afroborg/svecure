import { createServerLoadVerifier } from '$lib/handlers/auth';
import type { PageServerLoad } from './$types';

const verifier = createServerLoadVerifier<PageServerLoad>(() => {
	return true;
});

export const load = verifier(async () => {
	return {
		props: 'test',
		abc: 123
	};
});
