declare module 'promise-sequential' {
	type PromiseReturningFunction<R> = (prevResponse: R, responses: R[], count: number) => Promise<R>;

	export default function sequential<R = void>(promiseFns: PromiseReturningFunction<R>[]): Promise<R>;
}
