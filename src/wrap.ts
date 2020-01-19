import { wrap as comlinkWrap, Endpoint } from 'comlink';

const isPromise = (x: unknown): x is Promise<unknown> => (
  !!x && typeof (x as Promise<unknown>).then === 'function'
);

const isObject = (x: unknown): x is object => typeof x === 'object' && x !== null;

const createProxy = (remote: any): any => {
  const cacheForGet = new Map();
  const cacheForApply = new Map();
  return new Proxy(remote, {
    get(target, key) {
      if (cacheForGet.has(key)) {
        const result = cacheForGet.get(key);
        // cacheForGet.delete(key);
        if (isObject(result)) {
          return createProxy(result);
        }
        return result;
      }
      const result = target[key];
      if (isPromise(result)) {
        throw result.then((r) => { cacheForGet.set(key, r); });
      }
      if (isObject(result)) {
        return createProxy(result);
      }
      return result;
    },
    apply(target, thisArg, args) {
      const key = JSON.stringify(args); // hoping args is small and stringify is fast
      if (cacheForApply.has(key)) {
        const result = cacheForApply.get(key);
        // cacheForApply.delete(key);
        if (isObject(result)) {
          return createProxy(result);
        }
        return result;
      }
      const result = target.apply(thisArg, args);
      if (isPromise(result)) {
        throw result.then((r) => { cacheForApply.set(key, r); });
      }
      if (isObject(result)) {
        return createProxy(result);
      }
      return result;
    },
  });
};

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
export const wrap = <T>(ep: Endpoint): T => {
  const remote = comlinkWrap<T>(ep);
  const proxy = createProxy(remote);
  return proxy as T;
};
