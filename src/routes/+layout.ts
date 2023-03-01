import { createLoadVerifier } from '$lib/handlers/auth';
import type { LayoutLoad } from './$types';

const test = createLoadVerifier<LayoutLoad>(() => {
	return true;
});

export const load: LayoutLoad = test(() => {
	return {
		user: true
	};
});
