"use client";

import React, { useEffect, useRef } from "react";
import { heroData } from "@/lib/data/homepageContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function KineticTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && tickerRef.current && trackRef.current) {
        const clamp = gsap.utils.clamp(-30, 30);

        const st = ScrollTrigger.create({
          trigger: tickerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const vel = self.getVelocity();
            const targetNudge = clamp(vel * 0.015);
            gsap.to(trackRef.current, {
              x: `+=${targetNudge}`,
              ease: "power1.out",
              duration: 0.4,
              overwrite: "auto",
            });
          },
        });

        return () => {
          st.kill();
        };
      }
    }
  }, []);

  return (
    <div
      ref={tickerRef}
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        backgroundColor: "var(--color-obsidian)",
        padding: "18px 0",
        overflow: "hidden",
        position: "relative",
      }}
      id="live-inventory-ribbon"
    >
      <div style={{ display: "flex", overflow: "hidden" }}>
        <div ref={trackRef} className="kinetic-ticker-track">
          {[...heroData.liveTicker, ...heroData.liveTicker].map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                padding: "0 32px",
                fontSize: "0.85rem",
                fontFamily: "var(--font-technical)",
                color: "#e4e4e7",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-copper)",
                  boxShadow: "0 0 10px rgba(245, 130, 32, 0.6)",
                }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
