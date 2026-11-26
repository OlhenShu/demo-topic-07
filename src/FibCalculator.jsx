import { useEffect, useState } from "react";

export default function FibCalculator() {
  const [worker, setWorker] = useState(null);
  const [n, setN] = useState("35");
  const [result, setResult] = useState("");

  useEffect(() => {
    const w = new Worker(
      new URL("./fib.worker.js", import.meta.url),
      { type: "module" },
    );
    w.onmessage = (event) => {
      const { n, value } = event.data;
      setResult(`fib(${n}) = ${value}`);
    };
    setWorker(w);
    console.log("worker created");
    return () => {
      w.terminate();
      console.log("worker terminated");
    };
  }, []);

  function calculate() {
    setResult("Calculating...");
    worker.postMessage(Number(n));
  }

  return (
    <>
      <input
        type="number"
        value={n}
        onChange={(e) => setN(e.target.value)}
      />
      <button onClick={calculate} disabled={!worker}>
        Calculate
      </button>
      <p>{result}</p>
    </>
  );
}
