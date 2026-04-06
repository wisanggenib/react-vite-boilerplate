# Boilerplate Rules

Dokumen ini berisi aturan dan konvensi yang WAJIB diikuti saat bekerja dengan boilerplate ini. Jangan langgar rules ini tanpa alasan yang sangat kuat.

---

## 1. Arsitektur: Feature-Based Modules

Struktur utama adalah `src/features/{feature}/` — setiap fitur adalah **self-contained module**.

### Struktur wajib tiap fitur:
```
src/features/{nama-fitur}/
├── components/     ← React components milik fitur ini
├── hooks/          ← Custom hooks (useState/useEffect/dll)
├── services/       ← API calls & business logic (async, return Promise)
├── types/          ← Type definitions / shape validation
├── store/          ← (opsional) State lokal fitur via Context+useReducer
├── constants.js    ← Konstanta khusus fitur
└── index.js        ← WAJIB ADA — barrel file / public API fitur
```

### Dependency Rules (TIDAK BOLEH DILANGGAR):

| Import dari | Boleh import ke | Dilarang import ke |
|---|---|---|
| `features/X` | `shared/` | `features/Y` (fitur lain) |
| `shared/` | `shared/` | `features/` (apapun) |
| `app/` | `features/`, `shared/` | - |

**Jika dua fitur butuh berbagi sesuatu → pindahkan ke `shared/`.**

---

## 2. Barrel File (`index.js`) — Public API Fitur

Setiap fitur **WAJIB** punya `index.js` yang mengekspos public API-nya.

```js
// BENAR — import dari barrel file
import { LoginForm, useAuth } from '../features/auth'

// SALAH — import dari path internal
import { LoginForm } from '../features/auth/components/LoginForm'
```

Hanya ekspos yang memang perlu dipakai di luar fitur. Internal helpers tidak perlu di-export.

---

## 3. Runtime Environment Injection

Ini adalah fitur **inti** boilerplate. Pahami dengan baik.

### Cara kerja:
1. Saat container Docker start → `env.sh` berjalan dan menulis `window.__ENV = { VITE_*: "..." }` ke `env-config.js`
2. `src/config/env.js` membaca env dengan **prioritas**:
   ```
   window.__ENV (runtime) → import.meta.env (build-time) → default value
   ```

### Rules:
- **SELALU** akses env melalui `src/config/env.js`, JANGAN baca `import.meta.env` langsung di komponen/service
- Semua env variable **WAJIB** prefix `VITE_` agar diambil oleh `env.sh`
- Tambah env var baru? → Tambahkan di `src/config/env.js` sekaligus, dengan ketiga layer (runtime/build/default)
- `public/env-config.js` hanyalah placeholder kosong (`window.__ENV = {}`), jangan isi manual

---

## 4. State Management

Dua pola state yang digunakan, pilih sesuai konteks:

### Zustand — untuk global state
- Digunakan untuk state yang butuh diakses di banyak fitur (contoh: auth)
- File store ditempatkan di `src/store/` (root level, BUKAN di dalam fitur)
- Contoh: `src/store/authStore.js`

### Context + useReducer — untuk state lokal fitur
- Digunakan untuk state yang hanya relevan dalam satu fitur (contoh: cart)
- File store ditempatkan di dalam fitur: `src/features/{fitur}/store/`
- Provider harus didaftarkan di `src/app/providers.jsx`
- Contoh: `src/features/cart/store/cartStore.jsx`

### Jangan campur keduanya untuk satu domain yang sama.

---

## 5. Hooks vs Services

| | Hooks (`useXxx.js`) | Services (`xxxService.js`) |
|---|---|---|
| **Isi** | useState, useEffect, logika UI | Async functions, API calls |
| **Return** | State + handler functions | Promise |
| **Ketergantungan** | Boleh import service | Tidak import hooks |
| **Testing** | Butuh React test environment | Bisa di-test pure/isolated |

```js
// BENAR — hook memanggil service
export function useProducts() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    productService.getAll().then(setProducts)
  }, [])
  return { products }
}

// SALAH — service memanggil hook
export const productService = {
  getAll: () => { const [data] = useState([]) ... } // ← jangan
}
```

---

## 6. API Client

Semua HTTP call **WAJIB** melalui `src/shared/lib/apiClient.js`.

```js
import { apiClient } from '../../shared/lib/apiClient'

// GET
const users = await apiClient.get('/users')

// POST
const result = await apiClient.post('/users', { name: 'John' })
```

- `apiClient` otomatis attach Bearer token dari `localStorage` (`auth_token`)
- Throw `Error` jika response tidak OK (handle di level hook/component)
- Jangan buat fetch/axios wrapper sendiri di luar `apiClient`

---

## 7. Routing

Boilerplate ini **TIDAK menggunakan React Router**. Routing dikelola dengan `useState` di `App.jsx`.

- Page ID adalah string: `'home'`, `'login'`, `'users'`, dll
- Navigasi menggunakan callback `onNavigate(pageId)` yang di-pass sebagai prop
- Mapping page ID → component ada di `src/app/routes.jsx`
- Tambah halaman baru → tambahkan `case` baru di `getPageComponent()` di `routes.jsx`
- Route constants tetap ada di `src/shared/constants/routes.js` sebagai referensi path, meskipun saat ini belum digunakan untuk navigasi

---

## 8. AuthGuard

Setiap halaman yang butuh autentikasi **WAJIB** dibungkus `AuthGuard`.

```jsx
// Di routes.jsx
case 'dashboard':
  return {
    component: (
      <AuthGuard onNavigate={onNavigate}>
        <DashboardPage />
      </AuthGuard>
    ),
    ...
  }
```

- `AuthGuard` membaca state langsung dari `useAuthStore` (bukan via `useAuth`) untuk menghindari re-render tidak perlu
- Jika tidak authenticated → redirect ke `'login'` via `onNavigate`
- Halaman publik (`login`, `register`) → JANGAN dibungkus `AuthGuard`

---

## 9. Layout

Dua layout tersedia di `src/shared/components/layout/`:

| Layout | Digunakan untuk |
|---|---|
| `PublicLayout` | Halaman tanpa sidebar: login, register |
| `PrivateLayout` | Halaman dengan sidebar + header + footer |

- Penentuan layout ada di `App.jsx`, bukan di dalam halaman itu sendiri
- Layout menerima `title` dan `subtitle` untuk ditampilkan di header konten

---

## 10. Shared UI Components

Komponen primitif reusable ada di `src/shared/components/ui/`:
- `Button` — dengan props: `variant`, `size`, `loading`, `disabled`
- `Input` — dengan props: `label`, `type`, `placeholder`, `value`, `onChange`
- `Modal`, `Skeleton`

**WAJIB** pakai komponen ini untuk button, input, dan elemen UI dasar. Jangan buat `<button>` atau `<input>` HTML mentah di dalam komponen fitur.

---

## 11. Styling

- CSS plain tanpa Tailwind (meskipun arsitektur doc menyebut Tailwind, implementasi aktual pakai plain CSS)
- Setiap fitur/komponen punya file `.css` co-located di folder yang sama
- CSS global di `src/styles/globals.css` dan `src/styles/variables.css`
- Gunakan CSS variables yang sudah ada di `variables.css` untuk warna, spacing, dll
- Jangan taruh class yang hanya dipakai satu komponen ke `globals.css`

---

## 12. Bahasa: JavaScript (bukan TypeScript)

Meskipun `Arsitektur.md` menunjukkan ekstensi `.ts/.tsx`, implementasi aktual menggunakan **JavaScript murni** (`.js/.jsx`).

- File komponen React: `.jsx`
- File non-JSX (hooks, services, utils, store): `.js`
- Jangan tambah TypeScript tanpa diskusi lebih lanjut

---

## 13. Docker & Deployment

```
build image → container start → env.sh runs → nginx serves static files
```

- `Dockerfile` multi-stage: stage 1 build Node, stage 2 nginx serve
- `env.sh` otomatis dieksekusi oleh nginx Docker image via `/docker-entrypoint.d/`
- Inject env var saat `docker run` atau di `docker-compose.yml` dengan prefix `VITE_`
- Tidak perlu rebuild image saat ganti env var — cukup restart container

---

## 14. Dependency Minimalism

Dependensi saat ini sangat minimal: `react`, `react-dom`, `zustand`.

- Jangan tambah library baru tanpa pertimbangan matang
- Preferensi: native browser API dan React built-in sebelum install library
- Tidak ada: React Router, Axios, React Query, TanStack, dll

---

## Ringkasan Larangan

| # | DILARANG |
|---|---|
| 1 | Import antar fitur (`features/A` → `features/B`) |
| 2 | Import internal fitur melewati barrel file |
| 3 | Baca `import.meta.env` langsung di luar `src/config/env.js` |
| 4 | Membuat fetch/HTTP wrapper baru di luar `apiClient` |
| 5 | Membuat `<button>` / `<input>` HTML mentah di komponen fitur |
| 6 | Menyimpan global store di dalam folder fitur |
| 7 | `shared/` mengimport apapun dari `features/` |
| 8 | Halaman protected tanpa `AuthGuard` |
| 9 | Logika API call langsung di dalam komponen (harus lewat service + hook) |
| 10 | Menambah TypeScript tanpa diskusi |
