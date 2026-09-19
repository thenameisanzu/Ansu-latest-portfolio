"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
  style = {},
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsHoverDevice(!isTouch && window.matchMedia("(hover: hover)").matches);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
    setGlarePos({ x: xPercent, y: yPercent, opacity: 0.15 });
  };

  const onMouseLeave = () => {
    if (!isHoverDevice) return;
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        transform: isHoverDevice
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: "transform 0.18s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.3s ease",
        transformStyle: isHoverDevice ? "preserve-3d" : undefined,
        ...style,
      }}
      className={`relative ${className}`}
    >
      {children}

      {/* Dynamic Specular Light Glare */}
      {glare && isHoverDevice && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
          }}
        />
      )}
    </div>
  );
}

