'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* --- utils couleurs --- */
function getPrimaryColor() {
  const root = getComputedStyle(document.documentElement);
  const raw = root.getPropertyValue('--primary')?.trim() || '222 89% 55%';
  return `hsl(${raw})`;
}
function isDarkModeNow() {
  const html = document.documentElement;
  if (html.classList.contains('dark')) return true;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

/* --- Vectors --- */
class Vector2D {
  constructor(
    public x: number,
    public y: number
  ) {}
}
class Vector3D {
  constructor(
    public x: number,
    public y: number,
    public z: number
  ) {}
}

/* ---------------- Animation Controller ---------------- */
class AnimationController {
  private tl: gsap.core.Timeline;
  private t = 0;
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private primary = getPrimaryColor();
  private cameraZ = -400;
  private cameraTravel = 3400;
  private viewZoom = 100;
  private startYOffset = 28;
  private changeEventTime = 0.32;
  private stars: Star[] = [];
  private trailLength = 80;
  private numberOfStars = 2400;
  private getBg: () => string;

  constructor(
    private canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    private dpr: number,
    size: number,
    getBackground: () => string
  ) {
    this.ctx = ctx;
    this.size = size;
    this.getBg = getBackground;
    this.createStars();
    this.tl = gsap.timeline({ repeat: -1 }).to(this, {
      t: 1,
      duration: 15,
      ease: 'none',
      onUpdate: () => this.render(),
    });
  }

  private createStars() {
    for (let i = 0; i < this.numberOfStars; i++) {
      this.stars.push(new Star(this.cameraZ, this.cameraTravel));
    }
  }
  private map(v: number, a: number, b: number, c: number, d: number) {
    return c + (d - c) * ((v - a) / (b - a));
  }
  private clamp(v: number, min: number, max: number) {
    return Math.min(Math.max(v, min), max);
  }
  private ease(p: number, g: number) {
    return p < 0.5
      ? 0.5 * Math.pow(2 * p, g)
      : 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }

  private spiralPath(p: number) {
    p = this.clamp(1.2 * p, 0, 1);
    p = this.ease(p, 1.8);
    const turns = 6,
      theta = 2 * Math.PI * turns * Math.sqrt(p),
      r = 170 * Math.sqrt(p);
    return new Vector2D(
      r * Math.cos(theta),
      r * Math.sin(theta) + this.startYOffset
    );
  }

  public showProjectedDot(pos: Vector3D, sizeFactor: number) {
    const t2 = this.clamp(
      this.map(this.t, this.changeEventTime, 1, 0, 1),
      0,
      1
    );
    const newCamZ =
      this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravel;
    if (pos.z > newCamZ) {
      const depth = pos.z - newCamZ;
      const x = (this.viewZoom * pos.x) / depth;
      const y = (this.viewZoom * pos.y) / depth;
      const sw = (400 * sizeFactor) / depth;
      this.ctx.lineWidth = sw;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawStartDot() {
    if (this.t > this.changeEventTime) {
      const dy = (this.cameraZ * this.startYOffset) / this.viewZoom;
      const pos = new Vector3D(0, dy, this.cameraTravel);
      this.showProjectedDot(pos, 2.5);
    }
  }

  public render() {
    const ctx = this.ctx;
    // FOND light/dark
    ctx.fillStyle = this.getBg();
    ctx.fillRect(0, 0, this.size, this.size);

    ctx.save();
    ctx.translate(this.size / 2, this.size / 2);

    const t1 = this.clamp(
      this.map(this.t, 0, this.changeEventTime + 0.25, 0, 1),
      0,
      1
    );
    const t2 = this.clamp(
      this.map(this.t, this.changeEventTime, 1, 0, 1),
      0,
      1
    );
    ctx.rotate(-Math.PI * this.ease(t2, 2.7));

    // trail + étoiles → couleur primaire
    ctx.fillStyle = this.primary;
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;
      const p = t1 - 0.00015 * i;
      const base = this.spiralPath(p);
      ctx.beginPath();
      ctx.arc(base.x, base.y, sw / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const s of this.stars) s.render(t1, this as any);

    this.drawStartDot();
    ctx.restore();
  }

  public destroy() {
    this.tl.kill();
  }
}

class Star {
  private dx: number;
  private dy: number;
  private spiralLocation: number;
  private strokeW: number;
  private z: number;
  private angle: number;
  private distance: number;
  private dir: number;
  private expansion: number;
  private finalScale: number;
  constructor(cameraZ: number, cameraTravel: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.distance = 30 * Math.random() + 15;
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.expansion = 1.2 + Math.random() * 0.8;
    this.finalScale = 0.7 + Math.random() * 0.6;
    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);
    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    const r = (min: number, max: number) => min + Math.random() * (max - min);
    const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
    this.z = r(0.5 * cameraZ, cameraTravel + cameraZ);
    this.z = lerp(this.z, cameraTravel / 2, 0.3 * this.spiralLocation);
    this.strokeW = Math.pow(Math.random(), 2.0);
  }
  render(p: number, c: AnimationController) {
    const spiral = (c as any).spiralPath(this.spiralLocation) as Vector2D;
    const q = p - this.spiralLocation;
    if (q <= 0) return;
    const prog = Math.min(Math.max(4 * q, 0), 1);
    const baseX = spiral.x + this.dx * Math.min(prog, 1);
    const baseY = spiral.y + this.dy * Math.min(prog, 1);
    const vx =
      (((c as any).cameraZ * -1 + (c as any).cameraTravel / 2) * baseX) /
      (c as any).viewZoom;
    const vy =
      (((c as any).cameraZ * -1 + (c as any).cameraTravel / 2) * baseY) /
      (c as any).viewZoom;
    const pos = new Vector3D(vx, vy, this.z);
    const size = 8.5 * this.strokeW * (0.9 + 0.3 * prog) * this.finalScale;
    (c as any).showProjectedDot(pos, size);
  }
}

/* -------------------- Component wrapper -------------------- */
export function SpiralAnimation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [dim, setDim] = useState({
    w: globalThis.innerWidth,
    h: globalThis.innerHeight,
  });
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onResize = () =>
      setDim({ w: window.innerWidth, h: window.innerHeight });
    const onTheme = () => setDark(isDarkModeNow());
    window.addEventListener('resize', onResize);
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    mq?.addEventListener?.('change', onTheme);
    const obs = new MutationObserver(onTheme);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    onTheme();
    return () => {
      window.removeEventListener('resize', onResize);
      mq?.removeEventListener?.('change', onTheme);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const size = Math.max(dim.w, dim.h);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${dim.w}px`;
    canvas.style.height = `${dim.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const getBackground = () => (dark ? '#000000' : '#ffffff');
    const ctrl = new AnimationController(canvas, ctx, dpr, size, getBackground);
    return () => ctrl.destroy();
  }, [dim, dark]);

  return (
    <div className="relative h-full w-full bg-white dark:bg-black">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
