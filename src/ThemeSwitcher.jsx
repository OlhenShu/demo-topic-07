import { useEffect, useState } from "react";

const KEY = "theme";

function readTheme() {
  console.log("readTheme called");
  return localStorage.getItem(KEY) ?? "light";
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(readTheme);
  

  useEffect(() => {
    localStorage.setItem(KEY, theme);
    console.log("saved:", theme);
  }, [theme]);

  function toggle() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return <button onClick={toggle}>Theme: {theme}</button>;
}
