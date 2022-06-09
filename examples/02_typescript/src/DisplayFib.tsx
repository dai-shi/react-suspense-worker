import React from 'react';

import { wrap } from 'react-suspense-worker';

type Fib = (i: number) => number;

const fib = wrap<Fib>(new Worker(new URL('./slow_fib.worker', import.meta.url)));

const fastFib = (i: number) => {
  if (i <= 1) return i;
  let a = 0;
  let b = 1;
  for (let x = 1; x < i; x += 1) {
    [a, b] = [b, a + b];
  }
  return b;
};

type Props = {
  number: number;
};

const DisplayFib: React.FC<Props> = ({ number }) => {
  const result = fib(number);
  const result2 = fastFib(number);
  return (
    <div>
      <div>result: {result}</div>
      <div>result2: {result2}</div>
    </div>
  );
};

export default DisplayFib;
