'use client';

export function Background() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 [mask-image:radial-gradient(circle_at_center,white_0%,white_32%,transparent_70%)]"
    >
      {/* bandes verticales subtiles */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(90deg, rgba(241,245,249,0.7) 0 30px, rgba(255,255,255,1) 80px 80px)',
        }}
      />
      {/* variante dark via mix-blend */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-0 mix-blend-normal dark:mix-blend-normal"
        style={{
          background:
            'repeating-linear-gradient(90deg, rgba(23,23,23,0.7) 0 30px, rgba(10,10,10,1) 80px 80px)',
        }}
      />
      {/* bruit léger */}
      <div
        className="absolute inset-0 h-full w-full scale-[1.2] opacity-[0.05] dark:opacity-[0.07] [mask-image:radial-gradient(#fff,transparent,75%)]"
        style={{ backgroundImage: 'url(/noise.webp)', backgroundSize: '20%' }}
      />
    </div>
  );
}
