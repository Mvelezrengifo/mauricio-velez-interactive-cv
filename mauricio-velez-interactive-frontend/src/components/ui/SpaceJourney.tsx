'use client';

import { useEffect, useRef } from 'react';

export default function SpaceJourney() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: { x: number; y: number; z: number; prevX: number; prevY: number }[] = [];
    const numStars = 400;
    const speed = 0.02;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        z: Math.random() * 1000,
        prevX: 0,
        prevY: 0,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= speed * 100;

        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * 2000 - 1000;
          star.y = Math.random() * 2000 - 1000;
        }

        const scale = 200 / star.z;
        const x = cx + star.x * scale;
        const y = cy + star.y * scale;

        const prevScale = 200 / (star.z + speed * 100);
        const prevX = cx + star.x * prevScale;
        const prevY = cy + star.y * prevScale;

        const brightness = Math.min(1, (1000 - star.z) / 500);
        const lineWidth = Math.max(0.5, (1 - star.z / 1000) * 2);

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${150 + brightness * 105}, ${180 + brightness * 75}, 255, ${brightness})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, lineWidth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();

        star.prevX = x;
        star.prevY = y;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-black"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
