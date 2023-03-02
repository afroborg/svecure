import type { FailHandler } from './models/verify.js';

export const FAIL_DEFAULTS = {
	status: 401,
	message: 'Unauthorized'
} satisfies FailHandler;
