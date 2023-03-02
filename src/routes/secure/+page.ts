import { createLoadVerifier } from '$lib';
import type { PageLoad } from './$types';

const withPassword = createLoadVerifier<PageLoad>(({ url }) => {
	const password = url.searchParams.get('password');

	return password === 'test';
});

export const load = withPassword(async () => {
	return {
		message: 'The correct message was provided'
	};
});
