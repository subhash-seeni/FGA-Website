"use client";

import React, { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { heroData, heroCardsData, HeroCardVariant } from "@/lib/data/homepageContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CinematicHeroProps {
  onOpenEnquiry: (categoryKey?: string) => void;
}

const ROTATION_INTERVAL = 5000; // 5000ms dwell time per variant
const PROGRESS_TICK = 40; // 40ms interval for smooth 25fps progress bar

// Browser media query subscription for reduced-motion
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshotReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshotReducedMotion() {
  return false;
}

export default function CinematicHero({ onOpenEnquiry }: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const assetStageRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getSnapshotReducedMotion,
    getServerSnapshotReducedMotion
  );

  // GSAP Entrance and Parallax Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      if (!reducedMotion && containerRef.current) {
        const ctx = gsap.context(() => {
          // 1. Headline stagger reveal
          gsap.fromTo(
            ".hero-headline-line",
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "all",
            }
          );

          // 2. Parallax scroll on 3D asset stage window
          if (assetStageRef.current) {
            gsap.to(assetStageRef.current, {
              yPercent: -14,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          // 3. Subtle exit fade
          gsap.to(".hero-grid", {
            opacity: 0.35,
            scale: 0.97,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "center top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }, containerRef);

        return () => ctx.revert();
      }
    }
  }, [reducedMotion]);

  // Card Switch Handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroCardsData.length);
    setProgress(0);
    setRotate({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + heroCardsData.length) % heroCardsData.length);
    setProgress(0);
    setRotate({ x: 0, y: 0 });
  }, []);

  const handleSelectCard = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setRotate({ x: 0, y: 0 });
  }, []);

  // 5-Second Auto-Rotation with real-time countdown progress
  useEffect(() => {
    if (reducedMotion || isPaused) return;

    const increment = (PROGRESS_TICK / ROTATION_INTERVAL) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, handleNext]);

  // Mouse Move Tilt on Front Active Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const activeCard = heroCardsData[activeIndex];

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        paddingTop: "130px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="cinematic-container">
        {/* Top Minimal Coordinates */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            marginBottom: "40px",
          }}
        >
          <div className="mono-tag">{heroData.locationTag}</div>
          <div
            style={{
              fontFamily: "var(--font-technical)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              color: "var(--color-ink-muted)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            OPERATING LEASE INFRASTRUCTURE
          </div>
        </div>

        {/* Asymmetrical Cinematic Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.95fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Exaggerated Display Typography */}
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(3.6rem, 8.2vw, 7.8rem)",
                color: "var(--color-obsidian)",
                marginBottom: "28px",
                lineHeight: 0.94,
                letterSpacing: "-0.04em",
              }}
            >
              <span className="hero-headline-line" style={{ display: "inline-block" }}>Assets</span>{" "}
              <span
                className="hero-headline-line"
                style={{ display: "inline-block", color: "var(--color-copper)" }}
              >
                Work.
              </span>
              <br />
              <span className="hero-headline-line" style={{ display: "inline-block" }}>Capital</span>{" "}
              <span
                className="hero-headline-line"
                style={{
                  display: "inline-block",
                  color: "var(--color-obsidian)",
                }}
              >
                Stays.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                color: "var(--color-ink-muted)",
                lineHeight: 1.6,
                maxWidth: "520px",
                marginBottom: "36px",
                fontWeight: 500,
              }}
            >
              {heroData.bodyCopy}
            </p>

            {/* Playful Pill CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={() => onOpenEnquiry(activeCard.categoryKey)}
                className="btn-pill-primary"
                id="hero-apply-btn"
              >
                <span>Structure Your Lease</span>
                <ArrowRight size={16} />
              </button>

              <Link
                href="#asset-vault"
                className="btn-pill-secondary"
                id="hero-explore-btn"
              >
                <span>The Asset Vault</span>
                <ChevronDown size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Multi-Card Spatial Rotation Deck */}
          <div
            ref={assetStageRef}
            className="hero-deck-stage"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Firstgen Assets 3D Division Cards Deck"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {/* The 3D Spatial Deck Stack */}
            <div
              className="deck-perspective-container"
              style={{
                position: "relative",
                height: "470px",
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              {heroCardsData.map((card: HeroCardVariant, index: number) => {
                // Calculate position relative to active card:
                // offset 0 = active front, offset 1 = mid card peeking, offset 2 = deep card peeking
                const offset = (index - activeIndex + heroCardsData.length) % heroCardsData.length;
                const isFront = offset === 0;
                const isMid = offset === 1;
                const isDeep = offset === 2;

                // Dynamic transform calculations per offset
                let transformStyle = "";
                let zIndex = 10;
                let opacity = 0.4;
                let filter = "brightness(0.65) blur(2px)";
                let cursor = "pointer";

                if (isFront) {
                  zIndex = 30;
                  opacity = 1;
                  filter = "none";
                  cursor = "default";
                  transformStyle = `translate3d(0px, 0px, 0px) scale(1) rotate(0deg) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`;
                } else if (isMid) {
                  zIndex = 20;
                  opacity = 0.72;
                  filter = "brightness(0.85) contrast(0.95)";
                  transformStyle = "translate3d(32px, -20px, -50px) scale(0.92) rotate(3deg)";
                } else if (isDeep) {
                  zIndex = 10;
                  opacity = 0.42;
                  filter = "brightness(0.7) blur(1.5px)";
                  transformStyle = "translate3d(60px, -36px, -100px) scale(0.85) rotate(5.5deg)";
                }

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      if (!isFront) handleSelectCard(index);
                    }}
                    onMouseMove={isFront ? handleMouseMove : undefined}
                    className={`fga-deck-card ${isFront ? "active-front-card" : "background-card"}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "24px",
                      overflow: "hidden",
                      border: `1px solid ${isFront ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.08)"}`,
                      backgroundColor: "var(--color-obsidian)",
                      boxShadow: isFront
                        ? "0 32px 70px -16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                        : "0 18px 40px -12px rgba(0, 0, 0, 0.35)",
                      transform: transformStyle,
                      zIndex,
                      opacity,
                      filter,
                      cursor,
                      transition: isFront
                        ? "transform 0.12s ease-out, opacity 0.5s ease-out, filter 0.5s ease-out, border-color 0.4s ease"
                        : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease-out",
                      transformOrigin: "center center",
                      willChange: "transform, opacity",
                    }}
                    tabIndex={isFront ? 0 : -1}
                    aria-hidden={!isFront}
                  >
                    {/* Background Asset Image */}
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 45vw"
                        style={{ objectFit: "cover" }}
                        priority={index === 0}
                      />

                      {/* Vignette Gradients */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(8, 9, 11, 0.96) 0%, rgba(8, 9, 11, 0.25) 52%, rgba(8, 9, 11, 0.65) 100%)",
                        }}
                      />

                      {/* Top Floating Badge Bar */}
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "20px",
                          right: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pointerEvents: "none",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 14px",
                            backgroundColor: "rgba(10, 12, 16, 0.78)",
                            backdropFilter: "blur(14px)",
                            border: `1px solid ${isFront ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.08)"}`,
                            borderRadius: "9999px",
                            fontFamily: "var(--font-technical)",
                            fontSize: "0.72rem",
                            color: "#ffffff",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                          }}
                        >
                          <Sparkles size={13} style={{ color: card.accentColor }} />
                          <span>{card.badge}</span>
                        </div>

                        <span
                          style={{
                            fontFamily: "var(--font-technical)",
                            fontSize: "0.75rem",
                            color: card.accentColor,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {card.indexTag}
                        </span>
                      </div>

                      {/* Bottom Floating Parameter HUD */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "20px",
                          left: "20px",
                          right: "20px",
                          padding: "18px 22px",
                          backgroundColor: "rgba(16, 18, 22, 0.85)",
                          backdropFilter: "blur(18px)",
                          border: `1px solid ${isFront ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.08)"}`,
                          borderRadius: "16px",
                          transition: "opacity 0.35s ease",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                            paddingBottom: "12px",
                            marginBottom: "12px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                fontFamily: "var(--font-technical)",
                                color: "rgba(255, 255, 255, 0.6)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              FLAGSHIP ASSET
                            </div>
                            <div
                              style={{
                                fontSize: "1.08rem",
                                fontWeight: 700,
                                color: "#ffffff",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {card.flagshipTitle}
                            </div>
                          </div>

                          <div style={{ textAlign: "right" }}>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                fontFamily: "var(--font-technical)",
                                color: card.accentColor,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                fontWeight: 600,
                              }}
                            >
                              STRUCTURE
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--font-technical)",
                                fontSize: "0.95rem",
                                fontWeight: 700,
                                color: "#ffffff",
                              }}
                            >
                              {card.structureType}
                            </div>
                          </div>
                        </div>

                        {/* Micro Metric Ledger & Quick Action */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: "0.76rem",
                            color: "rgba(255, 255, 255, 0.72)",
                            fontFamily: "var(--font-technical)",
                          }}
                        >
                          <div style={{ display: "flex", gap: "18px" }}>
                            {card.metrics.map((metric, mIdx) => (
                              <div key={mIdx}>
                                <span
                                  style={{
                                    color: metric.highlight ? card.accentColor : "#ffffff",
                                    fontWeight: 700,
                                  }}
                                >
                                  {metric.prefix}
                                  {metric.value}
                                </span>{" "}
                                {metric.label}
                              </div>
                            ))}
                          </div>

                          {isFront && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenEnquiry(card.categoryKey);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: card.accentColor,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                cursor: "pointer",
                                fontSize: "0.74rem",
                                fontWeight: 600,
                                fontFamily: "var(--font-technical)",
                                padding: "2px 0",
                              }}
                              aria-label={`Enquire about ${card.flagshipTitle}`}
                            >
                              <span>ENQUIRE</span>
                              <ExternalLink size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro Navigation Bar & Division Pills */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "24px",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {/* Division Tab Switcher */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 6px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
                }}
              >
                {heroCardsData.map((card, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleSelectCard(idx)}
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        border: "none",
                        backgroundColor: isActive ? "var(--color-obsidian)" : "transparent",
                        color: isActive ? "#ffffff" : "var(--color-ink-muted)",
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {/* Active indicator dot */}
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: isActive ? card.accentColor : "rgba(0,0,0,0.2)",
                          transition: "background-color 0.25s ease",
                        }}
                      />
                      <span>{card.tabLabel}</span>

                      {/* Countdown Progress Line on the active pill */}
                      {isActive && !reducedMotion && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: "2.5px",
                            width: `${progress}%`,
                            backgroundColor: card.accentColor,
                            transition: isPaused ? "none" : "width 0.05s linear",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Kinetic Controls */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={handlePrev}
                  className="hero-arrow-btn"
                  aria-label="Previous Asset Division"
                  title="Previous Asset"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    color: "var(--color-obsidian)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={handleNext}
                  className="hero-arrow-btn"
                  aria-label="Next Asset Division"
                  title="Next Asset"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    color: "var(--color-obsidian)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-arrow-btn:hover {
          background-color: var(--color-obsidian) !important;
          color: #ffffff !important;
          border-color: var(--color-obsidian) !important;
          transform: translateY(-1px);
        }

        .background-card:hover {
          opacity: 0.88 !important;
          filter: brightness(0.95) contrast(1) !important;
        }

        @media (max-width: 900px) {
          :global(.hero-grid) {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-deck-stage {
            max-width: 100% !important;
          }
        }

        @media (max-width: 640px) {
          .deck-perspective-container {
            height: 440px !important;
          }
        }
      `}</style>
    </section>
  );
}
