import { FAIL_DEFAULTS } from '$lib/constants';
import type { LoadCallback, VerifyHandler } from '$lib/models/load';
import type { UnknownFunction, UnknownObject } from '$lib/models/utils';
import type { FailHandler } from '$lib/models/verify';
import { error } from '@sveltejs/kit';

export const fail = (handler: FailHandler = FAIL_DEFAULTS) => {
	if (typeof handler === 'function') {
		return handler();
	}

	const { status = FAIL_DEFAULTS.status, message = FAIL_DEFAULTS.message } = handler;

	throw error(status, message);
};

export const createLoadVerifier = <T extends UnknownFunction>(
	verify: VerifyHandler<T>,
	failHandler?: FailHandler
) => {
	const loadWrapperFunc = <R extends UnknownObject>(cb: LoadCallback<T, R>) => {
		const load = async (...params: Parameters<T>) => {
			const verified = await verify(...params);

			if (!verified) {
				return fail(failHandler);
			}

			return cb(...params);
		};

		return load;
	};

	return loadWrapperFunc;
};
