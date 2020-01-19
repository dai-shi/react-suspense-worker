// eslint-disable-next-line spaced-comment
/// <reference types="react/experimental" />

import React, { useState, useTransition } from 'react';

import DisplayFib from './DisplayFib';

const Main: React.FC = () => {
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

export default Main;
