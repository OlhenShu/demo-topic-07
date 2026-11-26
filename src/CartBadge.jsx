import { useEffect, useState } from "react";

const KEY = "cart";

function readCount() {
  const items = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  return items.length;
}

export default function CartBadge() {
  const [count, setCount] = useState(readCount);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== KEY && event.key !== null) return;
      console.log("storage event, key:", event.key);
      setCount(readCount());
    }
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function addItem() {
    const items = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    items.push({ id: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(items));
    setCount(items.length);
  }

  return <button onClick={addItem}>Cart: {count}</button>;
}
