import React, { useState, useEffect, useCallback } from 'react';

const CustomCursor = ({
    cursorImage,
    cursorSize = 100,
    trailLength = 20,
    trailColor = 'hsl(260, 70%, 70%)',
    burstColor = 'hsl(260, 100%, 75%)',
    burstSize = 30,
    rotationDegree = -15,
    glowColor = 'rgba(139, 92, 246, 0.5)'
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [particles, setParticles] = useState([]);
    const [burstParticles, setBurstParticles] = useState([]);

    // Enhanced smooth cursor movement with improved spring physics
    useEffect(() => {
        const springStrength = 0.05; // Reduced for smoother movement
        const dampening = 0.85; // Increased for more smoothing
        const interpolationFactor = 0.15; // Added for extra smoothness
        let frameId;

        const animate = () => {
            setSmoothPosition(prev => {
                // Calculate spring force with interpolation
                const dx = position.x - prev.x;
                const dy = position.y - prev.y;

                // Interpolate the target position
                const targetX = prev.x + dx * interpolationFactor;
                const targetY = prev.y + dy * interpolationFactor;

                // Update velocity with improved spring physics
                setVelocity(v => ({
                    x: (v.x + (targetX - prev.x) * springStrength) * dampening,
                    y: (v.y + (targetY - prev.y) * springStrength) * dampening
                }));

                // Apply easing to the final position
                return {
                    x: prev.x + velocity.x,
                    y: prev.y + velocity.y
                };
            });

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [position, velocity]);

    // Enhanced trail particles with different types
    const createTrailParticle = useCallback((x, y, velocityX, velocityY) => {
        const types = ['circle', 'square', 'star', 'triangle'];
        const type = types[Math.floor(Math.random() * types.length)];
        const baseSize = Math.random() * 6 + 2;

        return {
            x,
            y,
            type,
            size: baseSize,
            rotation: Math.random() * 360,
            life: 1,
            velocity: {
                x: velocityX * 0.5 + (Math.random() - 0.5) * 1.5,
                y: velocityY * 0.5 + (Math.random() - 0.5) * 1.5
            },
            rotationSpeed: (Math.random() - 0.5) * 10,
            color: `hsl(${260 + Math.random() * 40}, 70%, ${60 + Math.random() * 20}%)`
        };
    }, []);

    // Improved mouse movement handling with velocity smoothing
    const onMouseMove = useCallback((e) => {
        const { clientX, clientY } = e;

        // Smooth the position update
        setPosition(prev => ({
            x: prev.x + (clientX - prev.x) * 0.5, // Adjust this value for different smoothing
            y: prev.y + (clientY - prev.y) * 0.5
        }));

        setParticles(prev => {
            const newParticle = createTrailParticle(clientX, clientY, velocity.x, velocity.y);
            return [...prev, newParticle].slice(-trailLength);
        });
    }, [trailLength, velocity, createTrailParticle]);

    // Enhanced burst effect
    const createBurstParticle = (angle, speed, baseX, baseY) => ({
        x: baseX,
        y: baseY,
        size: Math.random() * burstSize + 8,
        life: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        },
        color: `hsl(${260 + Math.random() * 60}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 20}%)`,
        type: ['circle', 'square', 'star'][Math.floor(Math.random() * 3)]
    });

    const onMouseDown = useCallback(() => {
        setIsClicked(true);
        const burstCount = 16; // Increased particle count
        const newBurstParticles = [];

        // Create circular burst
        for (let i = 0; i < burstCount; i++) {
            const angle = (i / burstCount) * Math.PI * 2;
            const speed = Math.random() * 8 + 5;
            newBurstParticles.push(
                createBurstParticle(angle, speed, smoothPosition.x, smoothPosition.y)
            );
        }

        // Add some random scattered particles
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 12 + 3;
            newBurstParticles.push(
                createBurstParticle(angle, speed, smoothPosition.x, smoothPosition.y)
            );
        }

        setBurstParticles(prev => [...prev, ...newBurstParticles]);
    }, [smoothPosition, burstSize]);

    const onMouseUp = () => setIsClicked(false);

    // Enhanced particle animation
    useEffect(() => {
        const animateParticles = () => {
            setParticles(prev =>
                prev.map(particle => ({
                    ...particle,
                    life: particle.life * 0.92,
                    rotation: particle.rotation + particle.rotationSpeed,
                    x: particle.x + particle.velocity.x,
                    y: particle.y + particle.velocity.y,
                    velocity: {
                        x: particle.velocity.x * 0.98,
                        y: particle.velocity.y * 0.98
                    }
                })).filter(particle => particle.life > 0.01)
            );

            setBurstParticles(prev =>
                prev.map(particle => ({
                    ...particle,
                    life: particle.life * 0.94,
                    rotation: particle.rotation + particle.rotationSpeed,
                    x: particle.x + particle.velocity.x,
                    y: particle.y + particle.velocity.y,
                    velocity: {
                        x: particle.velocity.x * 0.96,
                        y: particle.velocity.y * 0.96
                    }
                })).filter(particle => particle.life > 0.01)
            );
        };

        const animationFrame = requestAnimationFrame(animateParticles);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [onMouseMove, onMouseDown]);

    const renderParticle = (particle) => {
        const baseStyle = {
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.life,
            backgroundColor: particle.color,
            transition: 'opacity 0.15s ease-out',
            willChange: 'transform, opacity'
        };

        switch (particle.type) {
            case 'square':
                return <div className="fixed pointer-events-none" style={baseStyle} />;
            case 'star':
                return (
                    <div
                        className="fixed pointer-events-none"
                        style={{
                            ...baseStyle,
                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                        }}
                    />
                );
            case 'triangle':
                return (
                    <div
                        className="fixed pointer-events-none"
                        style={{
                            ...baseStyle,
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                        }}
                    />
                );
            default: // circle
                return <div className="fixed pointer-events-none rounded-full" style={baseStyle} />;
        }
    };

    return (
        <>
            {/* Trail Particles */}
            {particles.map((particle, index) => renderParticle(particle))}

            {/* Burst Particles */}
            {burstParticles.map((particle, index) => renderParticle(particle))}

            {/* Main Cursor with enhanced smoothing */}
            <div
                className="fixed pointer-events-none z-50"
                style={{
                    left: `${smoothPosition.x}px`,
                    top: `${smoothPosition.y}px`,
                    transform: `translate(-50%, -50%) scale(${isClicked ? 0.8 : 1})`,
                    width: `${cursorSize}px`,
                    height: `${cursorSize}px`,
                    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother transition
                    willChange: 'transform'
                }}
            >
                <img
                    src={cursorImage}
                    alt="cursor"
                    className="w-full h-full object-contain transition-all duration-300" // Increased duration
                    style={{
                        transform: `rotate(${isClicked ? rotationDegree - 10 : rotationDegree}deg)`,
                        filter: `drop-shadow(0 0 10px ${isClicked ? glowColor.replace(', 0.5)', ', 0.8)') : glowColor})`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
                        willChange: 'transform, filter'
                    }}
                />
            </div>
        </>
    );
};

export default CustomCursor; 