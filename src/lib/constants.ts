import type { FailHandler } from '$lib/models/verify';

export const FAIL_DEFAULTS = {
	status: 401,
	message: 'Unauthorized'
} satisfies FailHandler;
