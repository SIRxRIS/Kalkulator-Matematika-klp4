"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const beams = [
    {
      initialX: 10,
      translateX: 10,
      initialY: "-100vh", // Start above the viewport
      translateY: "200vh", // Move through the entire viewport
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: "20%",
      translateX: "20%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 5,
      repeatDelay: 2,
      delay: 0,
    },
    {
      initialX: "40%",
      translateX: "40%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 6,
      repeatDelay: 4,
      delay: 1,
    },
    {
      initialX: "60%",
      translateX: "60%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 7,
      repeatDelay: 2,
      delay: 3,
    },
    {
      initialX: "80%",
      translateX: "80%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 5,
      repeatDelay: 3,
      className: "h-8",
      delay: 2,
    },
    {
      initialX: "90%",
      translateX: "90%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 8,
      repeatDelay: 3,
      delay: 1,
    },
    // Additional beams for better coverage
    {
      initialX: "30%",
      translateX: "30%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 9,
      repeatDelay: 4,
      className: "h-10",
      delay: 4,
    },
    {
      initialX: "70%",
      translateX: "70%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 6,
      repeatDelay: 5,
      className: "h-6",
      delay: 0,
    },
    {
      initialX: "15%",
      translateX: "15%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 7,
      repeatDelay: 2,
      className: "h-12",
      delay: 3,
    },
    {
      initialX: "45%",
      translateX: "45%",
      initialY: "-100vh",
      translateY: "200vh",
      duration: 8,
      repeatDelay: 3,
      delay: 2,
    },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "fixed inset-0 w-full h-screen bg-gradient-to-b from-neutral-950 to-neutral-800 overflow-hidden",
        className
      )}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={`beam-${index}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

// Fixed component with proper TypeScript types
const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>; // Updated type
    parentRef: React.RefObject<HTMLDivElement | null>; // Updated type
    beamOptions?: {
      initialX?: number | string;
      translateX?: number | string;
      initialY?: number | string;
      translateY?: number | string;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>((props, ref) => {
  const { parentRef, containerRef, beamOptions = {} } = props;
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-100vh",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "200vh",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute top-0 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className
        )}
        style={{
          left:
            typeof beamOptions.initialX === "string"
              ? beamOptions.initialX
              : `${beamOptions.initialX}px`,
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
