// lib/emitter.ts
'use client';

type EventMap = {
  'messages:created': any;
};

class Emitter {
  private t = new Map<keyof EventMap, Set<(p: any) => void>>();
  on<K extends keyof EventMap>(k: K, cb: (p: EventMap[K]) => void) {
    if (!this.t.has(k)) this.t.set(k, new Set());
    this.t.get(k)!.add(cb as any);
    return () => this.off(k, cb);
  }
  off<K extends keyof EventMap>(k: K, cb: (p: EventMap[K]) => void) {
    this.t.get(k)?.delete(cb as any);
  }
  emit<K extends keyof EventMap>(k: K, p: EventMap[K]) {
    this.t.get(k)?.forEach((cb) => cb(p));
  }
}
export const emitter = new Emitter();
