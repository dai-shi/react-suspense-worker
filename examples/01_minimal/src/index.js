import React, { Suspense, useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

import { wrap } from 'react-suspense-worker';

const fib = wrap(new Worker('./slow_fib.worker', { type: 'module' }));

const fastFib = (i) => {
  if (i <= 1) return i;
  let a = 0;
  let b = 1;
  for (let x = 1; x < i; x += 1) {
    [a, b] = [b, a + b];
  }
  return b;
};

const DisplayFib = ({ number }) => {
  const result = fib(number);
  const result2 = fastFib(number);
  return (
    <div>
      <div>result: {result}</div>
      <div>result2: {result2}</div>
    </div>
  );
};

const Main = () => {
  const [number, setNumber] = useState(1);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const onClick = () => {
    startTransition(() => {
      setNumber((c) => c + 1);
    });
  };
  return (
    <div>
      <span>number: {number}</span>
      <button type="button" onClick={onClick}>+1</button>
      {isPending && 'Pending...'}
      <DisplayFib number={number} />
    </div>
  );
};

const App = () => (
  <Suspense fallback={<span>Loading...</span>}>
    <Main />
  </Suspense>
);

createRoot(document.getElementById('app')).render(<App />);
