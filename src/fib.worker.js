function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

self.onmessage = (event) => {
  const n = event.data;
  self.postMessage({ n, value: fib(n) });
};
