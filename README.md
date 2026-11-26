# Спринт 7. Демо для вебінару

Vite + React на `http://localhost:5173`. Код компонентів — з конспекту спринту 7. `StrictMode` увімкнено навмисно: у консолі буде подвійне створення воркера і закриття сокета до рукостискання.

## Перед ефіром

```bash
npm install
npm run dev
```

В окремій папці сервер **не** запускайте до блоку WebSocket:

```bash
cd ws-server
npm install
node server.mjs
```

У консолі `http://localhost:5173` виконайте `localStorage.clear()` і перезавантажте сторінку.

## Що відкривати

| Блок | Екран |
| --- | --- |
| Web Storage, консоль | `http://localhost:5173/#theme` |
| Тема | `src/ThemeSwitcher.jsx` |
| Кошик і подія `storage` | `src/CartBadge.jsx`, дві вкладки `#cart` |
| Воркер без React | `http://localhost:5173/demo.html` (`public/demo.js`, `public/worker.js`) |
| Фібоначчі | `src/FibCalculator.jsx` і `src/fib.worker.js`, сторінка `#fib` |
| Чат | спочатку `node server.mjs`, потім `#chat` і `src/ChatApp.jsx` |
