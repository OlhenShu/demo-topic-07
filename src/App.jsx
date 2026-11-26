import { useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import CartBadge from "./CartBadge.jsx";
import FibCalculator from "./FibCalculator.jsx";
import ChatApp from "./ChatApp.jsx";

const VIEWS = [
  { id: "theme", label: "Тема" },
  { id: "cart", label: "Кошик" },
  { id: "fib", label: "Фібоначчі" },
  { id: "chat", label: "Чат" },
];

const HINTS = {
  theme:
    "Натисніть кнопку, потім перезавантажте сторінку. У консолі — readTheme called і saved.",
  cart:
    "Відкрийте цю саму адресу в другій вкладці. Клік тут змінює лічильник там, без перезавантаження.",
  fib:
    "Введіть 40 і натисніть Calculate. Поки видно Calculating… — друкуйте в полі нижче і перемикайте тему.",
  chat:
    "Сервер запускайте лише перед цим блоком: у папці ws-server команда node server.mjs. Потім Say hi і зміна кімнати.",
};

function readView() {
  const id = window.location.hash.replace("#", "");
  return VIEWS.some((view) => view.id === id) ? id : "theme";
}

export default function App() {
  const [view, setView] = useState(readView);

  useEffect(() => {
    const onHash = () => setView(readView());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "theme";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <header>
        <p className="kicker">Спринт 7</p>
        <h1>Web Storage, Web Workers і WebSocket</h1>
        <nav>
          {VIEWS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={view === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href="/demo.html">Воркер без React</a>
        </nav>
      </header>

      <main>
        <p className="hint">{HINTS[view]}</p>
        <div className="stage">
          {view === "theme" && <ThemeSwitcher />}
          {view === "cart" && <CartBadge />}
          {view === "fib" && (
            <>
              <ThemeSwitcher />
              <FibCalculator />
            </>
          )}
          {view === "chat" && <ChatApp />}
        </div>
        <label className="probe">
          Поле, щоб перевірити, що сторінка жива
          <input type="text" placeholder="Друкуйте тут під час довгого розрахунку" />
        </label>
      </main>
    </>
  );
}
