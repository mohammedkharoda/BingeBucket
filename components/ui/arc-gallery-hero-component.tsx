'use client';

import React, { useEffect, useState } from 'react';

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardWidthLg?: number;
  cardWidthMd?: number;
  cardWidthSm?: number;
  cardHeightLg?: number;
  cardHeightMd?: number;
  cardHeightSm?: number;
  className?: string;
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 25,
  endAngle = 155,
  radiusLg = 520,
  radiusMd = 380,
  radiusSm = 280,
  cardWidthLg = 130,
  cardWidthMd = 105,
  cardWidthSm = 82,
  cardHeightLg = 195,
  cardHeightMd = 158,
  cardHeightSm = 123,
  className = '',
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardWidth: cardWidthLg,
    cardHeight: cardHeightLg,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardWidth: cardWidthSm, cardHeight: cardHeightSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardWidth: cardWidthMd, cardHeight: cardHeightMd });
      } else {
        setDimensions({ radius: radiusLg, cardWidth: cardWidthLg, cardHeight: cardHeightLg });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardWidthLg, cardWidthMd, cardWidthSm, cardHeightLg, cardHeightMd, cardHeightSm]);

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: '100%', height: dimensions.radius * 1.15 }}
    >
      {/* Center pivot at bottom-center */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
        {images.map((src, i) => {
          const angle = startAngle + step * i;
          const angleRad = (angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * dimensions.radius;
          const y = Math.sin(angleRad) * dimensions.radius;
          // Middle card (featured) gets a slight scale up
          const isFeatured = i === Math.floor(count / 2);
          const tiltDeg = (angle - 90) * 0.18; // subtle tilt toward arc center

          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: dimensions.cardWidth,
                height: dimensions.cardHeight,
                left: `calc(50% + ${x}px)`,
                bottom: `${y}px`,
                transform: `translate(-50%, 50%) rotate(${tiltDeg}deg) scale(${isFeatured ? 1.08 : 1})`,
                zIndex: isFeatured ? count + 5 : count - Math.abs(i - Math.floor(count / 2)),
                opacity: 0,
                animation: 'arc-fade-in 0.7s ease-out forwards',
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: isFeatured
                    ? '0 24px 48px rgba(0,0,0,0.65), 0 0 0 2px rgba(232,117,106,0.5)'
                    : '0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.07)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 28px 56px rgba(0,0,0,0.75), 0 0 0 2px rgba(232,117,106,0.6)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = isFeatured
                    ? '0 24px 48px rgba(0,0,0,0.65), 0 0 0 2px rgba(232,117,106,0.5)'
                    : '0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)';
                }}
              >
                <img
                  src={src}
                  alt={`Movie poster ${i + 1}`}
                  draggable={false}
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes arc-fade-in {
          from { opacity: 0; transform: translate(-50%, 62%) rotate(0deg) scale(0.88); }
          to   { opacity: 1; transform: translate(-50%, 50%); }
        }
      `}</style>
    </div>
  );
};
