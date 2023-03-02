# 🔐 Svecure - Secure your load functions

Secure your load functions with wrappers that will handle errorchecking for you.

## Installation

```bash
npm install svecure

# or yarn
yarn add svecure

# or pnpm
pnpm add svecure
```

## Usage

```ts
// +(page|layout).ts

import { createLoadVerifier } from 'svecure';
import { PageLoad } from './$types';

const withVerification = createLoadVerifier<PageLoad>(() => {
	// ...your verification logic
	return true;
});

export const load = withVerification(() => {
	return {
		// ...your data
	};
});
```

```ts
// +(page|layout).server.ts

import { createLoadVerifier } from 'svecure';
import { PageServerLoad } from './$types';

const withVerification = createLoadVerifier<PageServerLoad>(() => {
	// ...your verification logic
	return true;
});

export const load = withVerification(() => {
	return {
		// ...your data
	};
});
```

### Custom error messages

If the verification fails, the load functino will by default throw a SvelteKit [`error`](https://kit.svelte.dev/docs/modules#sveltejs-kit-error) with a status of `401` and a message of `Unauthorized`. You can customize this by passing a second argument to `createLoadVerifier`:

```ts
const withVerification = createLoadVerifier<PageLoad>(
	() => {
		// ...your verification logic
		return false;
	},
	{
		status: 403,
		message: 'You are not allowed to access this page'
	}
);
```

Or with a custom function (if you for example need to redirect to a login page):

```ts
import { redirect } from '@sveltejs/kit';

const withVerification = createLoadVerifier<PageLoad>(
	() => {
		// ...your verification logic
		return false;
	},
	() => {
		throw redirect(302, '/login');
	}
);
```
