import { Endpoint } from 'comlink';
/**
 * Wrap a worker to be used with React Suspense
 *
 * @example
 * import { wrap } from 'react-suspense-worker';
 *
 * const fib = wrap(new Worker('./slow_fib.worker', { type: 'module' }));
 *
 * const DisplayFib = ({ number }) => {
 *   const result = fib(number);
 *   return <div>result: {result}</div>;
 * };
 */
export declare const wrap: <T>(ep: Endpoint) => T;
