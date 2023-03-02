import { DEFAULT_VERIFY_OPTIONS } from '$lib/constants';
import type { LoadCallback, VerifyHandler, VerifyOptions } from '$lib/models/load';
import type { UnknownFunction, UnknownObject } from '$lib/models/utils';
import { error } from '@sveltejs/kit';

const getOptions = (opts: VerifyOptions = {}) => {
	const {
		errorStatus = DEFAULT_VERIFY_OPTIONS.errorStatus,
		errorMessage = DEFAULT_VERIFY_OPTIONS.errorMessage
	} = opts;

	return { errorStatus, errorMessage };
};

export const createLoadVerifier = <T extends UnknownFunction>(
	verify: VerifyHandler<T>,
	opts?: VerifyOptions
) => {
	const { errorStatus, errorMessage } = getOptions(opts);

	const loadWrapperFunc = <R extends UnknownObject>(cb: LoadCallback<T, R>) => {
		const load = async (...params: Parameters<T>) => {
			const verified = await verify(...params);

			if (!verified) {
				throw error(errorStatus, errorMessage);
			}

			return cb(...params);
		};

		return load;
	};

	return loadWrapperFunc;
};
