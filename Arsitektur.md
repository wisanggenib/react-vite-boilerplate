src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useLogin.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   ├── utils/
│   │   │   └── tokenManager.ts
│   │   ├── constants.ts
│   │   └── index.ts          ← Public API (barrel file)
│   │
│   ├── users/
│   │   ├── components/
│   │   │   ├── UserCard.tsx
│   │   │   ├── UserList.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── hooks/
│   │   │   └── useUsers.ts
│   │   ├── services/
│   │   │   └── userService.ts
│   │   ├── types/
│   │   │   └── user.types.ts
│   │   └── index.ts
│   │
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── cart/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── store/             ← State management khusus fitur
│       │   └── cartStore.ts
│       ├── types/
│       └── index.ts
│
├── shared/                    ← Reusable di seluruh aplikasi
│   ├── components/
│   │   ├── ui/               ← Primitif UI
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Skeleton.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── cn.ts             ← className merger (tailwind)
│   │   └── validator.ts
│   ├── types/
│   │   └── global.types.ts
│   ├── constants/
│   │   └── routes.ts
│   └── lib/
│       └── apiClient.ts      ← Axios/fetch wrapper
│
├── app/                       ← Entry points / routing
│   ├── routes.tsx
│   ├── providers.tsx          ← Semua context providers
│   └── App.tsx
│
├── assets/
│   ├── images/
│   ├── fonts/
���   └── icons/
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
├── config/
│   └── env.ts
│
├── main.tsx
└── vite-env.d.ts