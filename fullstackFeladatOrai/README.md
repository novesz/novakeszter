# Converted Fullstack Project (React + Vite frontend, Express backend)

## Mit csináltam?
- A frontend **külön JSX komponensekre** lett bontva: `Header`, `UserForm`, `UserTable`, `ErrorBox`, `Loader`.
- Készült egy `api.js` modul (axios) az `/api/users` végpontokhoz.
- A Vite-hoz beállítottam **proxy-t** (`/api` → `http://localhost:3001`) a `vite.config.js`-ben.
- A backend változatlanul megmaradt (Express + MySQL2), de hozzáadtam egy **/api/health** végpontot.

## Futtatás

1) Backend:
```bash
cd server
npm i
npm run dev   # vagy: npm start
# API: http://localhost:3001
```

2) Frontend (új terminálban):
```bash
cd client
npm i
npm run dev
# Frontend: http://localhost:5173
```

- A frontend az `/api` útvonalon keresztül éri el a backendet (proxy miatt nem kell teljes URL).
- Feltételezett végpontok (a meglévő szervered alapján):
  - `GET /api/users` – listázás
  - `POST /api/users` – létrehozás `{ name, email }`
  - `PUT /api/users/:id` – módosítás `{ name, email }`
  - `DELETE /api/users/:id` – törlés

## Struktúra
```
converted_fullstack/
  server/            # eredeti backend (Express + MySQL2) + /api/health
    server.js
    package.json
  client/            # új React (Vite) frontend komponensekre bontva
    index.html
    vite.config.js
    src/
      App.jsx
      api.js
      index.css
      main.jsx
      components/
        Header.jsx
        UserForm.jsx
        UserTable.jsx
        ErrorBox.jsx
        Loader.jsx
```

## Jegyzetek
- Ha a backend más adatbázis mezőket használ (pl. nem `id`, `name`, `email`), igazítsd a `UserTable.jsx`-t és az `api.js`-t.
- Ha CORS-ot használsz és nem a proxyval hívsz, maradhat, de a proxy miatt **nem szükséges** a frontend oldalon teljes URL.
