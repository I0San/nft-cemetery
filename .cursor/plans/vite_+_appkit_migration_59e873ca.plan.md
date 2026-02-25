---
name: Vite + AppKit Migration
overview: Migrate the dapp from Create React App + ConnectKit + wagmi v1 to Vite + Reown AppKit + wagmi v2 + TanStack Query, while preserving all existing styling and functionality.
todos:
  - id: deps
    content: "Update package.json: remove react-scripts/connectkit/env-cmd, add vite/@vitejs/plugin-react/@reown/appkit/@reown/appkit-adapter-wagmi/@tanstack/react-query, upgrade wagmi/viem to v2"
    status: completed
  - id: vite-config
    content: Create vite.config.js and update root index.html (from public/index.html), update %PUBLIC_URL% references
    status: completed
  - id: env-files
    content: Rename REACT_APP_ → VITE_ in all .env.* files
    status: completed
  - id: entry-point
    content: Rename src/index.js → src/main.jsx, update import.meta.env refs and entry script tag
    status: completed
  - id: appkit-setup
    content: Rewrite src/components/web3/wagmi.js with WagmiAdapter + createAppKit, rewrite connectKitCustomProvider.js as AppKitProvider wrapper
    status: completed
  - id: wagmi-v2-hooks
    content: Update useApprove.js and useBuryMyNFT.js to use useWalletClient + waitForTransactionReceipt, remove walletClient.js
    status: completed
  - id: viem-v2
    content: Update useGetGraves.js for viem v2 getContract API change (publicClient → client)
    status: completed
  - id: app-header
    content: Update App.js provider wrapping and header ConnectKitButton → <appkit-button />
    status: completed
  - id: env-source
    content: "Update all source files: process.env.REACT_APP_* → import.meta.env.VITE_*"
    status: completed
  - id: css-paths
    content: "Fix background image paths in global.css: ../../public/img/ → /img/"
    status: completed
isProject: false
---

# Vite + AppKit Migration Plan

## Current Stack

- CRA (`react-scripts` 5.0.1) for build
- wagmi v1.3.8 + viem v1.2.15
- ConnectKit v1.4.0 for wallet UI
- `env-cmd` for environment management

## Target Stack

- **Vite** (latest) + `@vitejs/plugin-react`
- **React 18** (latest)
- **wagmi v2** + **viem v2**
- **@tanstack/react-query v5** (required peer dep for wagmi v2)
- **@reown/appkit** + **@reown/appkit-adapter-wagmi** (replaces ConnectKit)
- Keep: zustand, react-router-dom v6, react-hot-toast, framer-motion, react-infinite-scroll-component, use-debounce, react-ga4

---

## Migration Breakdown

### 1. Build tooling: CRA → Vite

- Remove `react-scripts`, `env-cmd`; add `vite`, `@vitejs/plugin-react`
- Create `[dapp/vite.config.js](dapp/vite.config.js)` (React plugin + Node polyfills for web3)
- Move `public/index.html` → root `index.html`; replace `%PUBLIC_URL%` with `/`, add `<script type="module" src="/src/main.jsx">` entry point
- Rename `src/index.js` → `src/main.jsx`
- Scripts: replace `react-scripts start/build` with `vite --mode [hardhat|testnet|mainnet]`; Vite natively reads `.env.[mode]` files, so `env-cmd` is no longer needed
- Env var prefix: `REACT_APP_` → `VITE_` in all `.env.`* files
- Env access: `process.env.REACT_APP_`* → `import.meta.env.VITE_`* in all source files
- CSS image paths in `[src/styles/global.css](src/styles/global.css)`: `url("../../public/img/...")` → `url("/img/...")` (Vite serves `/public` from root)

### 2. Wallet UI: ConnectKit → Reown AppKit

New packages: `@reown/appkit @reown/appkit-adapter-wagmi`

Rewrite `[src/components/web3/wagmi.js](src/components/web3/wagmi.js)`:

```js
// Setup outside React components:
const wagmiAdapter = new WagmiAdapter({ networks, projectId })
createAppKit({ adapters: [wagmiAdapter], networks, projectId, metadata, themeVariables: {...} })
export const wagmiConfig = wagmiAdapter.wagmiConfig
```

Replace `[src/components/web3/connectKitCustomProvider.js](src/components/web3/connectKitCustomProvider.js)` with an `AppKitProvider` that wraps `WagmiProvider` + `QueryClientProvider`.

AppKit theming via `themeVariables` (replaces `--ck-*` CSS vars):

- `--w3m-color-bg-1: #20202d`, `--w3m-accent: #4f286b`, `--w3m-border-radius-master: 4px` (maps to 20px border-radius)

In `[src/components/@layout/header/index.js](src/components/@layout/header/index.js)`: replace `<ConnectKitButton />` with `<appkit-button />` (AppKit web component).

### 3. wagmi v1 → v2 breaking changes

- `[src/App.js](src/App.js)`: `WagmiConfig` → `WagmiProvider` (now comes from AppKit provider wrapper)
- Remove `[src/components/web3/walletClient.js](src/components/web3/walletClient.js)` (module-level `window.ethereum` client) — replace with `useWalletClient()` hook inside the hooks that need it
- `[src/hooks/useApprove.js](src/hooks/useApprove.js)` + `[src/hooks/useBuryMyNFT.js](src/hooks/useBuryMyNFT.js)`:
  - Get wallet client via `useWalletClient()` from wagmi
  - `waitForTransaction` → `waitForTransactionReceipt(wagmiConfig, { hash })` from `@wagmi/core`
- `[src/hooks/useGetGraves.js](src/hooks/useGetGraves.js)`: viem v2 changes `getContract({ publicClient })` → `getContract({ client: publicClient })`

---

## Files Changed

- `package.json` — new deps, new scripts
- `public/index.html` → `index.html` (root)
- `.env`, `.env.hardhat`, `.env.mainnet`, `.env.testnet` — rename all `REACT_APP_` → `VITE_`
- `src/index.js` → `src/main.jsx`
- `src/App.js` — update imports and provider
- `src/styles/global.css` — fix image paths
- `src/components/web3/wagmi.js` — full rewrite
- `src/components/web3/connectKitCustomProvider.js` → AppKit provider
- `src/components/web3/walletClient.js` — removed
- `src/hooks/useApprove.js` — wagmi v2 APIs
- `src/hooks/useBuryMyNFT.js` — wagmi v2 APIs
- `src/hooks/useGetGraves.js` — viem v2 `getContract` API
- `src/components/@layout/header/index.js` — `<appkit-button />`
- `src/components/ga/index.js` — env vars
- `src/pages/funeral/index.js` — env vars
- `src/pages/graveyard/index.js` — env vars

## New Files

- `vite.config.js` — Vite configuration with React plugin

