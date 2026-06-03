'use client';

import { useEffect, useRef } from 'react';

interface StarsCanvasProps {
  progress?: number; // 0 a 1
  isMoving?: boolean; // si debe moverse más rápido
}

export default function StarsCanvas({ progress = 0, isMoving = false }: StarsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; radius: number; alpha: number; baseRadius: number }[] = [];
    for (let i = 0; i < 400; i++) {
      const baseRadius = Math.random() * 2 + 0.5;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRadius,
        alpha: Math.random() * 0.6 + 0.2,
        baseRadius,
      });
    }

    let yOffset = 0;
    const speed = isMoving ? 2 : 0.5; // velocidad base

    let meteors: { x: number; y: number; speedX: number; speedY: number; length: number; alpha: number }[] = [];

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Actualizar offset para sensación de movimiento
      yOffset = (yOffset + speed) % height;

      const scale = 1 + progress * 4;
      stars.forEach(star => {
        let yPos = star.y + yOffset;
        if (yPos > height) yPos -= height;
        ctx.beginPath();
        ctx.arc(star.x, yPos, star.baseRadius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Meteoros
      for (let i = 0; i < meteors.length; i++) {
        const m = meteors[i];
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length, m.y - m.length * 0.5);
        ctx.strokeStyle = `rgba(255, 200, 100, ${m.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 200, ${m.alpha})`;
        ctx.fill();

        m.x += m.speedX;
        m.y += m.speedY;
        m.alpha -= 0.01;
        if (m.alpha <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(draw);
    }

    setInterval(() => {
      if (Math.random() < 0.3) {
        meteors.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.3,
          speedX: Math.random() * 6 + 3,
          speedY: Math.random() * 4 + 2,
          length: Math.random() * 50 + 30,
          alpha: 0.8,
        });
      }
    }, 2000);

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [progress, isMoving]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}