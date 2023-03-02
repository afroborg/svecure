import { fail } from '$lib/handlers/verify';
import { redirect } from '@sveltejs/kit';
import { describe, it, expect } from 'vitest';

// TODO: Validate the error outputs

describe('options', () => {
	it('uses default values if none are provided', () => {
		expect(() => fail()).toThrowError();
	});

	it('can throw a custom error', () => {
		const error = new Error('Custom error');

		const thisShouldThrow = () =>
			fail(() => {
				throw error;
			});

		expect(thisShouldThrow).toThrowError(error);
	});

	it('can return default values', () => {
		const thisShouldThrow = () =>
			fail(() => {
				throw redirect(301, '/foo');
			});

		expect(thisShouldThrow).toThrowError();
	});

	// it('uses provided values if they are provided', () => {
	// 	const customOptions = {
	// 		errorStatus: 500,
	// 		errorMessage: 'Custom error message'
	// 	};

	// 	const options = fail(customOptions);
	// 	expect(options).toStrictEqual(customOptions);
	// });

	// it('uses default values if only some are provided', () => {
	// 	const customOptions = {
	// 		errorStatus: 500
	// 	};

	// 	const options = fail(customOptions);
	// 	expect(options).toStrictEqual({
	// 		...DEFAULT_VERIFY_OPTIONS,
	// 		...customOptions
	// 	});
	// });
});
