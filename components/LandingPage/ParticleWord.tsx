'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface Vector2D {
  x: number;
  y: number;
}
const ELECTRIC_BLUE = { r: 0x00, g: 0xa8, b: 0xe8 }; // #00A8E8
const BLACK = { r: 0, g: 0, b: 0 };
const WHITE = { r: 255, g: 255, b: 255 };

const colorFor = (index: number) => {
  const isDark = document.documentElement.classList.contains('dark');
  if (index === 0) return ELECTRIC_BLUE; // mot 1 = bleu (dans les 2 modes)
  return isDark ? WHITE : BLACK; // mot 2 = blanc (dark) / noir (light)
};
// Adoucit les bords en multipliant l’alpha avec des dégradés
function applyEdgeFade(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  fadeX = 48, // largeur du fondu gauche/droite
  fadeY = 24 // hauteur du fondu haut/bas
) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';

  // Horizontal: 0 → fadeX (0→1), w-fadeX → w (1→0)
  const gx = ctx.createLinearGradient(0, 0, w, 0);
  const lx = Math.max(0, Math.min(1, fadeX / w));
  gx.addColorStop(0, 'rgba(0,0,0,0)');
  gx.addColorStop(lx, 'rgba(0,0,0,1)');
  gx.addColorStop(1 - lx, 'rgba(0,0,0,1)');
  gx.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gx;
  ctx.fillRect(0, 0, w, h);

  // Vertical: 0 → fadeY (0→1), h-fadeY → h (1→0)
  const gy = ctx.createLinearGradient(0, 0, 0, h);
  const ly = Math.max(0, Math.min(1, fadeY / h));
  gy.addColorStop(0, 'rgba(0,0,0,0)');
  gy.addColorStop(ly, 'rgba(0,0,0,1)');
  gy.addColorStop(1 - ly, 'rgba(0,0,0,1)');
  gy.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gy;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };

  closeEnoughTarget = 100;
  maxSpeed = 1.0;
  maxForce = 0.1;
  particleSize = 10;
  isKilled = false;

  startColor = { r: 0, g: 0, b: 0 };
  targetColor = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.01;

  move() {
    let proximityMult = 1;
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) +
        Math.pow(this.pos.y - this.target.y, 2)
    );

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };

    const magnitude = Math.sqrt(
      towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y
    );
    if (magnitude > 0) {
      towardsTarget.x =
        (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
      towardsTarget.y =
        (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    };

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }

    const currentColor = {
      r: Math.round(
        this.startColor.r +
          (this.targetColor.r - this.startColor.r) * this.colorWeight
      ),
      g: Math.round(
        this.startColor.g +
          (this.targetColor.g - this.startColor.g) * this.colorWeight
      ),
      b: Math.round(
        this.startColor.b +
          (this.targetColor.b - this.startColor.b) * this.colorWeight
      ),
    };

    const fill = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;

    if (drawAsPoints) {
      ctx.fillStyle = fill;
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    } else {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const randomPos = this.generateRandomPos(
        width / 2,
        height / 2,
        (width + height) / 2
      );
      this.target.x = randomPos.x;
      this.target.y = randomPos.y;

      this.startColor = {
        r:
          this.startColor.r +
          (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g:
          this.startColor.g +
          (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b:
          this.startColor.b +
          (this.targetColor.b - this.startColor.b) * this.colorWeight,
      };
      this.targetColor = { r: 0, g: 0, b: 0 };
      this.colorWeight = 0;

      this.isKilled = true;
    }
  }

  private generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000;
    const randomY = Math.random() * 500;

    const direction = {
      x: randomX - x,
      y: randomY - y,
    };

    const magnitude = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag;
      direction.y = (direction.y / magnitude) * mag;
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    };
  }
}

const FR_WORDS = ['PROPULSE', 'DÉCUPLE'];
const EN_WORDS = ['BOOST', 'SCALE']; // <-- choisis ce que tu veux

export function ParticleTextEffect({
  words, // facultatif: si tu le passes depuis le parent, on le respecte
}: {
  words?: string[];
}) {
  const pathname = usePathname();
  const locale = /^\/en(\/|$)/.test(pathname) ? 'en' : 'fr';

  // ⬇️ on résout les mots en fonction de la locale si "words" n'est pas fourni
  const resolvedWords = words ?? (locale === 'en' ? EN_WORDS : FR_WORDS);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    isPressed: false,
    isRightClick: false,
  });

  const pixelSteps = 6;

  const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
    const randomX = Math.random() * 1000;
    const randomY = Math.random() * 500;

    const direction = {
      x: randomX - x,
      y: randomY - y,
    };

    const magnitude = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag;
      direction.y = (direction.y / magnitude) * mag;
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    };
  };

  const nextWord = (word: string, canvas: HTMLCanvasElement, index: number) => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offscreenCtx = offscreenCanvas.getContext('2d')!;

    // Texte centré (identique)
    offscreenCtx.fillStyle = 'white';
    // APRÈS
    offscreenCtx.font = '1000 180px Poppins, Arial, system-ui, sans-serif';
    offscreenCtx.textAlign = 'center';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2);

    const imageData = offscreenCtx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const pixels = imageData.data;

    // Couleur cible:
    // - index 0 => bleu électrique
    // - index 1 => blanc (dark) / noir (light)
    const newColor = colorFor(index);

    const particles = particlesRef.current;
    let particleIndex = 0;

    // Collecte des coordonnées (identique)
    const coordsIndexes: number[] = [];
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i);
    }

    // Shuffle (identique)
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coordsIndexes[i], coordsIndexes[j]] = [
        coordsIndexes[j],
        coordsIndexes[i],
      ];
    }

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex;
      const alpha = pixels[pixelIndex + 3];

      if (alpha > 0) {
        const x = (pixelIndex / 4) % canvas.width;
        const y = Math.floor(pixelIndex / 4 / canvas.width);

        let particle: Particle;

        if (particleIndex < particles.length) {
          particle = particles[particleIndex];
          particle.isKilled = false;
          particleIndex++;
        } else {
          particle = new Particle();

          const randomPos = generateRandomPos(
            canvas.width / 2,
            canvas.height / 2,
            (canvas.width + canvas.height) / 2
          );
          particle.pos.x = randomPos.x;
          particle.pos.y = randomPos.y;

          particle.maxSpeed = Math.random() * 6 + 4;
          particle.maxForce = particle.maxSpeed * 0.05;
          particle.particleSize = Math.random() * 6 + 6;
          particle.colorBlendRate = Math.random() * 0.0275 + 0.0025;

          particles.push(particle);
        }

        // transition couleur (identique)
        particle.startColor = {
          r:
            particle.startColor.r +
            (particle.targetColor.r - particle.startColor.r) *
              particle.colorWeight,
          g:
            particle.startColor.g +
            (particle.targetColor.g - particle.startColor.g) *
              particle.colorWeight,
          b:
            particle.startColor.b +
            (particle.targetColor.b - particle.startColor.b) *
              particle.colorWeight,
        };
        particle.targetColor = newColor;
        particle.colorWeight = 0;

        particle.target.x = x;
        particle.target.y = y;
      }
    }

    // Kill restants (identique)
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height);
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const particles = particlesRef.current;

    // Fond transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.move();
      particle.draw(ctx, true);

      if (particle.isKilled) {
        if (
          particle.pos.x < 0 ||
          particle.pos.x > canvas.width ||
          particle.pos.y < 0 ||
          particle.pos.y > canvas.height
        ) {
          particles.splice(i, 1);
        }
      }
    }

    // ➜ Adoucit les bords (tu peux ajuster 64/40)
    applyEdgeFade(ctx, canvas.width, canvas.height, 64, 40);

    // Switch entre les 2 mots
    frameCountRef.current++;
    if (frameCountRef.current % 240 === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % 2;
      nextWord(
        resolvedWords[wordIndexRef.current],
        canvas,
        wordIndexRef.current
      );
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1200;
    canvas.height = 240;

    // 1er mot = bleu électrique
    wordIndexRef.current = 0;
    nextWord(resolvedWords[0], canvas, 0);

    animate();

    // events souris (identique)
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isPressed = true;
      mouseRef.current.isRightClick = e.button === 2;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
      mouseRef.current.isRightClick = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', handleContextMenu);

    // si on bascule le thème, on relance la même frame avec la bonne couleur au prochain cycle
    const obs = new MutationObserver(() => {
      const target = colorFor(wordIndexRef.current);
      particlesRef.current.forEach((p) => {
        p.startColor = {
          r:
            p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight,
          g:
            p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight,
          b:
            p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight,
        };
        p.targetColor = target;
        p.colorWeight = 0;
      });
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      obs.disconnect();
    };
  }, [resolvedWords, locale]);

  return (
    <div className="flex flex-col items-center justify-center  bg-transparent">
      <canvas
        ref={canvasRef}
        className="bg-transparent"
        style={{ maxWidth: '100%', height: 'auto', background: 'transparent' }}
      />
    </div>
  );
}
