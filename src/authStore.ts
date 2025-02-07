// src/authStore.ts
import { writable } from 'svelte/store';

// El store guarda si el usuario está autenticado o no
export const isAuthenticated = writable(false);
