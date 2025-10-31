// lib/notifications.ts
'use client';

/** Enregistre le service worker public/sw.js */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('/sw.js');
  } catch {}
}

/** Demande la permission Notification API (best effort) */
export async function askPermission() {
  if (!('Notification' in window)) return 'denied';
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

/** Affiche une notification locale via le SW */
export async function showLocalNotification(
  title: string,
  options?: NotificationOptions
) {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  try {
    await reg.showNotification(title, options);
  } catch {}
}

/** ✅ Helper pratique pour ton init côté client */
export async function ensureSWAndPermission() {
  try {
    await registerServiceWorker();
  } catch {}
  try {
    if ('Notification' in window && Notification.permission === 'default') {
      await askPermission();
    }
  } catch {}
}
