# react-suspense-worker

[![Build Status](https://travis-ci.com/dai-shi/react-suspense-worker.svg?branch=master)](https://travis-ci.com/dai-shi/react-suspense-worker)
[![npm version](https://badge.fury.io/js/react-suspense-worker.svg)](https://badge.fury.io/js/react-suspense-worker)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-suspense-worker)](https://bundlephobia.com/result?p=react-suspense-worker)

React Suspense for Web Worker with Comlink

## Introduction

This is an experimental library to support Web Workers with React Suspense.
Currently, it's implemented with
[Comlink](https://github.com/GoogleChromeLabs/comlink).
Comlink is promise based, but a value wrapped by this library
can be treated as a normal value without async/await.

Known issues:

-   No way to clear cache
-   Class not supported (yet)
-   (...and maybe more)

## Install

```bash
npm install react-suspense-worker
```

## Usage

slow_fib.worker.js:
```javascript
import { expose } from 'react-suspense-worker';

const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

expose(fib);
```

app.js:
```javascript
import { wrap } from 'react-suspense-worker';

const fib = wrap(new Worker('./slow_fib.worker', { type: 'module' }));

const DisplayFib = ({ number }) => {
  const result = fib(number);
  return (
    <div>
      <div>result: {result}</div>
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
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### expose

Expose a value in worker thread to be wrapped in main thread

#### Examples

```javascript
import { expose } from 'react-suspense-worker';

const fib = (i) => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

expose(fib);
```

### wrap

Wrap a worker to be used with React Suspense

#### Parameters

-   `ep` **Endpoint** 

#### Examples

```javascript
import { wrap } from 'react-suspense-worker';

const fib = wrap(new Worker('./slow_fib.worker', { type: 'module' }));

const DisplayFib = ({ number }) => {
  const result = fib(number);
  return <div>result: {result}</div>;
};
```

Returns **T** 

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:01_minimal
```

and open <http://localhost:8080> in your web browser.

<!--
You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-suspense-worker/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-suspense-worker/tree/master/examples/02_typescript)
-->
