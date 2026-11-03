"use client";

import React, { useEffect, useRef } from "react";
import EditorialContent from "./EditorialContent";
import InfrastructureVisualization from "./InfrastructureVisualization";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface InstitutionalInfrastructureProps {
  id?: string;
  className?: string;
}

export default function InstitutionalInfrastructure({
  id = "institutional-infrastructure",
  className = "",
}: InstitutionalInfrastructureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const arcPathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const connectorLinesRef = useRef<SVGGElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // In reduced motion mode, show everything immediately without transitions
      return;
    }

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // Setup connecting arc stroke draw
      const arcEl = arcPathRef.current;
      let pathLength = 600;
      if (arcEl && typeof arcEl.getTotalLength === "function") {
        try {
          pathLength = arcEl.getTotalLength();
        } catch {
          pathLength = 600;
        }
      }

      // Initial states for sequential entrance
      if (arcEl) {
        gsap.set(arcEl, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      if (connectorLinesRef.current) {
        gsap.set(connectorLinesRef.current, { opacity: 0 });
      }

      const nodes = sectionEl.querySelectorAll(".arc-node");
      gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: "center center" });

      const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current].filter(Boolean);
      gsap.set(panels, { opacity: 0, x: 28 });

      const logos = sectionEl.querySelectorAll(".infra-logo");
      gsap.set(logos, { opacity: 0, scale: 0.94 });

      // Master entrance timeline triggered when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 75%",
          once: true,
        },
      });

      // 1. Eyebrow fades in
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
        );
      }

      // 2. Headline reveals with a subtle upward movement
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.35"
        );
      }

      // 3. Supporting paragraph fades in
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
          "-=0.45"
        );
      }

      // Accent line and location indicator
      if (accentRef.current) {
        tl.fromTo(
          accentRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.45, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (locationRef.current) {
        tl.fromTo(
          locationRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );
      }

      // 4. Orange connecting arc draws itself progressively
      if (arcEl) {
        tl.to(
          arcEl,
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.inOut",
          },
          "-=0.5"
        );
      }

      // 5. Three circular nodes illuminate sequentially & connectors fade in
      if (nodes.length > 0) {
        tl.to(
          nodes,
          {
            scale: 1,
            opacity: 1,
            stagger: 0.16,
            duration: 0.45,
            ease: "back.out(2)",
          },
          "-=0.8"
        );
      }

      if (connectorLinesRef.current) {
        tl.to(
          connectorLinesRef.current,
          {
            opacity: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          "-=0.5"
        );
      }

      // 6. Three infrastructure panels reveal from left to right with subtle stagger
      if (panels.length > 0) {
        tl.to(
          panels,
          {
            opacity: 1,
            x: 0,
            stagger: 0.14,
            duration: 0.75,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      // 7. Institutional logos fade in with a subtle stagger
      if (logos.length > 0) {
        tl.to(
          logos,
          {
            opacity: 1,
            scale: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.45"
        );
      }
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`institutional-infrastructure-section ${className}`}
      style={{
        position: "relative",
        backgroundColor: "#0B0D10",
        padding: "clamp(88px, 9.5vw, 150px) 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Subtle Ambient Orange Glow Around Central Infrastructure Graphic */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "12%",
          transform: "translateY(-50%)",
          width: "min(720px, 85vw)",
          height: "min(720px, 85vw)",
          background:
            "radial-gradient(circle, rgba(245, 130, 32, 0.08) 0%, rgba(245, 130, 32, 0.02) 40%, rgba(11, 13, 16, 0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Restrained Dotted Wave Matrix Pattern in Bottom-Left */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "-20px",
          width: "420px",
          height: "320px",
          pointerEvents: "none",
          opacity: 0.55,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 420 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 14 }).map((_, rowIndex) =>
            Array.from({ length: 18 }).map((_, colIndex) => {
              const x = colIndex * 24 + 12;
              const waveOffset = Math.sin((colIndex * 0.45) + (rowIndex * 0.35)) * 10;
              const y = rowIndex * 22 + 12 + waveOffset;
              const distFromOrigin = Math.sqrt(
                Math.pow(colIndex / 18, 2) + Math.pow((14 - rowIndex) / 14, 2)
              );
              const opacity = Math.max(0.03, Math.min(0.24, 0.28 - distFromOrigin * 0.22));
              const isAccent = (colIndex + rowIndex) % 11 === 0;

              return (
                <circle
                  key={`dot-${rowIndex}-${colIndex}`}
                  cx={x}
                  cy={y}
                  r={isAccent ? 1.6 : 1.1}
                  fill={isAccent ? "#F58220" : "#FFFFFF"}
                  fillOpacity={isAccent ? opacity * 1.8 : opacity}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Main Full-Width Asymmetrical Two-Part Container */}
      <div
        className="editorial-container"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 clamp(20px, 4.5vw, 64px)",
        }}
      >
        <div className="infra-asymmetric-grid">
          {/* Left Column: Editorial Content (~35% width on desktop) */}
          <div ref={leftColRef} className="infra-col-left">
            <EditorialContent
              eyebrowRef={eyebrowRef}
              headlineRef={headlineRef}
              descRef={descRef}
              accentRef={accentRef}
              locationRef={locationRef}
            />
          </div>

          {/* Right Column: Infrastructure Visualization (~65% width on desktop) */}
          <div className="infra-col-right">
            <InfrastructureVisualization
              arcPathRef={arcPathRef}
              nodesRef={nodesRef}
              connectorLinesRef={connectorLinesRef}
              panel1Ref={panel1Ref}
              panel2Ref={panel2Ref}
              panel3Ref={panel3Ref}
            />
          </div>
        </div>
      </div>

      {/* Scoped High-Fidelity Styles */}
      <style>{`
        /* Asymmetrical 2-Column Grid (34% / 66%) */
        .infra-asymmetric-grid {
          display: grid;
          grid-template-columns: minmax(310px, 34%) minmax(0, 1fr);
          align-items: center;
          gap: clamp(28px, 4vw, 56px);
          width: 100%;
          box-sizing: border-box;
        }

        .infra-col-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .infra-col-right {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          min-width: 0;
        }

        .infra-panels-stack {
          min-width: 0;
          width: 100%;
        }

        .infra-panel {
          min-width: 0;
          box-sizing: border-box;
          width: 100%;
        }

        /* Panel Hover Micro-Interactions */
        .infra-panel:hover {
          border-color: rgba(245, 130, 32, 0.38) !important;
          background-color: rgba(22, 24, 32, 0.82) !important;
          transform: translateY(-2px);
          box-shadow: inset 2px 0 18px -2px rgba(245, 130, 32, 0.28), 0 24px 54px -16px rgba(0, 0, 0, 0.7) !important;
        }

        /* Panel Body Row Layouts */
        .infra-panel-content-row {
          display: flex;
          align-items: center;
          width: 100%;
          min-width: 0;
          gap: 20px;
        }

        .infra-panel-text-col {
          flex: 0 0 38%;
          max-width: 270px;
          min-width: 0;
        }

        .infra-panel-divider {
          width: 1px;
          height: 44px;
          background-color: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .infra-panel-logos-col {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }

        .infra-logos-row {
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 20px;
          width: 100%;
          min-width: 0;
        }

        .infra-tata-col {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-width: 0;
        }

        .infra-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-width: 0;
          transition: transform 0.25s ease, filter 0.25s ease;
        }

        .infra-logo-wrapper:hover {
          transform: scale(1.03);
          filter: drop-shadow(0 0 12px rgba(245, 130, 32, 0.25));
        }

        .infra-logo {
          max-height: 28px;
          width: 100%;
          max-width: 135px;
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Panel 03 Compliance 4-Item Grid */
        .infra-compliance-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: center;
          width: 100%;
          gap: 12px;
          min-width: 0;
          box-sizing: border-box;
        }

        .infra-compliance-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4px 6px;
          min-width: 0;
          width: 100%;
          position: relative;
        }

        .infra-compliance-item:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -6px;
          top: 12%;
          height: 76%;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.08);
        }

        .infra-compliance-desc {
          font-family: var(--font-mono);
          font-size: clamp(0.6rem, 0.72vw, 0.7rem) !important;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-top: 8px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* TABLET BREAKPOINTS (1024px to 1279px) */
        @media (max-width: 1180px) {
          .infra-asymmetric-grid {
            grid-template-columns: minmax(290px, 35%) minmax(0, 1fr);
            gap: 28px;
          }
          .infra-panel-text-col {
            flex: 0 0 40%;
          }
          .infra-logos-row {
            gap: 14px;
          }
        }

        /* TABLET & SMALL LAPTOPS (900px to 1023px) */
        @media (max-width: 1024px) {
          .infra-asymmetric-grid {
            grid-template-columns: 1fr;
            gap: 52px;
          }
          .infra-col-left {
            max-width: 680px;
          }
          .infra-col-right {
            justify-content: flex-start;
          }
        }

        /* MOBILE BREAKPOINTS (< 768px) */
        @media (max-width: 768px) {
          .infra-asymmetric-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .infra-connecting-arc {
            width: 36px !important;
          }

          .infra-panel-content-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .infra-panel-text-col {
            flex: 1 1 100%;
            max-width: 100%;
          }

          .infra-panel-divider {
            display: none;
          }

          .infra-logos-row {
            justify-content: flex-start;
            gap: 20px;
            flex-wrap: wrap;
          }

          .infra-tata-col {
            justify-content: flex-start;
          }

          .infra-compliance-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 12px;
          }

          .infra-compliance-item:not(:last-child)::after {
            display: none;
          }

          .infra-compliance-item {
            align-items: flex-start;
            padding: 8px 4px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .infra-compliance-desc {
            text-align: left !important;
          }
        }
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .infra-panel-text-col {
            flex: 1 1 100%;
            max-width: 100%;
          }

          .infra-panel-divider {
            display: none;
          }

          .infra-logos-row {
            justify-content: flex-start;
            gap: 20px;
            flex-wrap: wrap;
          }

          .infra-tata-col {
            justify-content: flex-start;
          }

          .infra-compliance-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 12px;
          }

          .infra-item-divider {
            display: none;
          }

          .infra-compliance-item {
            align-items: flex-start;
            padding: 8px 4px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .infra-compliance-desc {
            text-align: left !important;
          }
        }

        @media (max-width: 480px) {
          .infra-arc-container {
            display: none;
          }
          .infra-visualization {
            width: 100%;
          }
          .infra-compliance-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

