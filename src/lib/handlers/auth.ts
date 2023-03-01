import { DEFAULT_VERIFY_OPTIONS } from '$lib/constants';
import type {
	Load,
	LoadCallback,
	ServerLoad,
	ServerVerifyHandler,
	VerifyHandler,
	VerifyOptions
} from '$lib/models/load';
import type { UnknownObject } from '$lib/models/utils';
import { error } from '@sveltejs/kit';

const getOptions = (opts: VerifyOptions = {}) => {
	const {
		errorStatus = DEFAULT_VERIFY_OPTIONS.errorStatus,
		errorMessage = DEFAULT_VERIFY_OPTIONS.errorMessage
	} = opts;

	return { errorStatus, errorMessage };
};

export const createLoadVerifier = <T extends Load>(
	verify: VerifyHandler<T>,
	opts: VerifyOptions = {}
) => {
	const { errorStatus, errorMessage } = getOptions(opts);

	const load =
		<R extends UnknownObject>(cb: LoadCallback<T, R>) =>
		async (...params: Parameters<T>) => {
			const verified = await verify(...params);

			if (!verified) {
				throw error(errorStatus, errorMessage);
			}

			return cb(...params);
		};

	return load;
};

export const createServerLoadVerifier = <T extends ServerLoad>(
	verify: ServerVerifyHandler<T>,
	opts: VerifyOptions = {}
) => {
	const { errorStatus, errorMessage } = getOptions(opts);

	return <R extends UnknownObject>(cb: LoadCallback<T, R>) => {
		return async (...params: Parameters<T>) => {
			const verified = await verify(...params);

			if (!verified) {
				throw error(errorStatus, errorMessage);
			}

			return cb(...params);
		};
	};
};
