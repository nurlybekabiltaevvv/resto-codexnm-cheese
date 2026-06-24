# 🍽 Resto CodexNM  
**Premium Restaurant Automation PWA**

Resto CodexNM — это современное Progressive Web Application (PWA) для автоматизации ресторана уровня fine dining / Michelin.  
Приложение построено на React 19 + Vite + TypeScript и включает 4 интерфейса:

-  Guest (QR Menu)
-  Kitchen (KDS)
-  Waiter Terminal
-  Admin Dashboard

Проект реализован в единой кодовой базе с глобальным состоянием через Zustand и готов к запуску как полноценное PWA-приложение.



## Tech Stack

### Core
- React 19
- TypeScript
- Vite 8
- React Router DOM v7
- Zustand (Global State)

### UI / UX
- TailwindCSS v4
- Framer Motion
- Lucide React (Icons)

### PWA
- vite-plugin-pwa
- Service Worker
- Offline support
- Installable on mobile devices

### Code Quality
- ESLint 10
- TypeScript ESLint
- React Hooks lint rules



## Installation

```bash
# 1. Clone repository
git clone <your-repo-url>

# 2. Go into project
cd resto-codexnm

# 3. Install dependencies
npm install
```



## Development

```bash
npm run dev
```

Runs Vite development server.

Default:
```
http://localhost:5173
```



## Production Build

```bash
npm run build
```

This runs:
1. TypeScript project build (`tsc -b`)
2. Vite production build

Output directory:
```
/dist
```

To preview production build locally:

```bash
npm run preview
```



## PWA Features

- Installable on Android / iOS (Add to Home Screen)
- Service Worker enabled
- Offline caching support
- Optimized build for production
- App-like experience

The PWA configuration is handled via:

```
vite-plugin-pwa
```



## Application Architecture

The application is structured as a **role-based system**.

### Routes

| Route | Role | Description |
|--------|------|------------|
| `/menu/:tableId` | Guest | QR-based digital menu |
| `/waiter` | Waiter | Order management terminal |
| `/kitchen` | Kitchen | Kitchen Display System |
| `/admin` | Admin | Revenue + Stop-list control |



## Project Structure (Recommended)

```
src/
│
├── components/
├── pages/
│   ├── GuestMenu.tsx
│   ├── WaiterTerminal.tsx
│   ├── KitchenKDS.tsx
│   └── AdminDashboard.tsx
│
├── store/
│   └── store.ts
│
├── router/
│   └── App.tsx
│
├── styles/
│
└── main.tsx
```



## State Management

Global state is handled via:

```
Zustand
```

Store responsibilities:
- Menu items
- Orders
- Order status updates
- Stop-list management
- Realtime simulation between roles



## Design Philosophy

- Minimalist
- Premium aesthetic
- High contrast
- Black / White / Orange accent system
- Clean spacing and typography

UI built with:
- Tailwind utility-first approach
- Framer Motion for smooth transitions



## Linting

Run ESLint:

```bash
npm run lint
```

Configured with:
- @eslint/js
- typescript-eslint
- react-hooks rules
- react-refresh rules



## Deployment

This project can be deployed to:

- Vercel
- Netlify
- Cloudflare Pages
- Docker (optional containerization)

Example (Vercel):

```bash
npm install -g vercel
vercel
```


## Target Use Case

Designed for:
- Fine dining restaurants
- Michelin-level service flow
- Premium hospitality environments
- Modern POS replacement systems
- Real-time kitchen synchronization



## Future Improvements (Optional Roadmap)

- Backend integration (Supabase / Firebase)
- Realtime WebSocket support
- Authentication roles
- Payment integration (Stripe)
- Multi-language support
- Table floor map visualization
- Inventory automation



## License

Private project.



## Author

Developed as a modern PWA restaurant automation system powered by React 19 + Vite 8.
