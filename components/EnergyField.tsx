
import React, { useRef, useEffect } from 'react';

const EnergyField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const particleColor = '#FFD580';
        const lineColor = '#3b2f4b';

        class Particle {
            x: number;
            y: number;
            size: number;
            vx: number;
            vy: number;
            
            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.2; // Slow random velocity
                this.vy = (Math.random() - 0.5) * 0.2;
            }

            draw() {
                if(!ctx) return;
                ctx.fillStyle = particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap particles around the screen
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const animate = () => {
            if(!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };
        
        const connect = () => {
            if(!ctx) return;
            let connectDistance = 120; // Connection distance in pixels
            
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = Math.sqrt(
                        Math.pow(particles[a].x - particles[b].x, 2) +
                        Math.pow(particles[a].y - particles[b].y, 2)
                    );
                    
                    if (distance < connectDistance) {
                        const opacity = 1 - (distance / connectDistance);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.8;
                        ctx.globalAlpha = opacity;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1.0; // Reset global alpha for next frame
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default EnergyField;