export type FailHandler =
	| {
			status?: number;
			message?: string;
	  }
	| (() => never); // this should be a function that throws an error;
