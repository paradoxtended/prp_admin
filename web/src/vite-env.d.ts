/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMeta {
  globEager<T = any>(glob: string): Record<string, T>;
}