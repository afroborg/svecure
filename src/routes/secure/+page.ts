import { createLoadVerifier } from '$lib/handlers/auth';
import type { PageLoad } from './$types';

const withUsername = createLoadVerifier<PageLoad>(async ({ parent }) => {
	const data = await parent();
	return data.user;
});

export const load = withUsername(() => {
	return {
		a: 1
	};
});
