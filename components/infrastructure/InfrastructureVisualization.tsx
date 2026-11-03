"use client";

import React, { useRef, useState, useEffect, forwardRef } from "react";
import ConnectingArc from "./ConnectingArc";
import BankingPanel from "./BankingPanel";
import CreditPanel from "./CreditPanel";
import CompliancePanel from "./CompliancePanel";

export interface InfrastructureVisualizationProps {
  arcPathRef?: React.RefObject<SVGPathElement | null>;
  nodesRef?: React.RefObject<SVGGElement | null>;
  connectorLinesRef?: React.RefObject<SVGGElement | null>;
  panel1Ref?: React.MutableRefObject<HTMLDivElement | null>;
  panel2Ref?: React.MutableRefObject<HTMLDivElement | null>;
  panel3Ref?: React.MutableRefObject<HTMLDivElement | null>;
}

export const InfrastructureVisualization = forwardRef<
  HTMLDivElement,
  InfrastructureVisualizationProps
>(function InfrastructureVisualization(
  {
    arcPathRef,
    nodesRef,
    connectorLinesRef,
    panel1Ref,
    panel2Ref,
    panel3Ref,
  },
  ref
) {
  const stackRef = useRef<HTMLDivElement>(null);
  const internalPanel1Ref = useRef<HTMLDivElement>(null);
  const internalPanel2Ref = useRef<HTMLDivElement>(null);
  const internalPanel3Ref = useRef<HTMLDivElement>(null);

  // Set default sensible coordinates before DOM measurement
  const [positions, setPositions] = useState({
    y1: 68,
    y2: 218,
    y3: 374,
    height: 446,
  });

  useEffect(() => {
    const updatePositions = () => {
      const p1El = panel1Ref?.current || internalPanel1Ref.current;
      const p2El = panel2Ref?.current || internalPanel2Ref.current;
      const p3El = panel3Ref?.current || internalPanel3Ref.current;
      const sEl = stackRef.current;

      if (!p1El || !p2El || !p3El || !sEl) return;

      const stackRect = sEl.getBoundingClientRect();
      const p1Rect = p1El.getBoundingClientRect();
      const p2Rect = p2El.getBoundingClientRect();
      const p3Rect = p3El.getBoundingClientRect();

      setPositions({
        y1: Math.round(p1Rect.top - stackRect.top + p1Rect.height / 2),
        y2: Math.round(p2Rect.top - stackRect.top + p2Rect.height / 2),
        y3: Math.round(p3Rect.top - stackRect.top + p3Rect.height / 2),
        height: Math.round(sEl.offsetHeight),
      });
    };

    updatePositions();
    const handleResize = () => updatePositions();
    window.addEventListener("resize", handleResize);

    // Minor delay to catch dynamic font layout stabilization
    const timer = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [panel1Ref, panel2Ref, panel3Ref]);

  // Synchronize ref callbacks
  const setPanel1 = (el: HTMLDivElement | null) => {
    internalPanel1Ref.current = el;
    if (panel1Ref) {
      panel1Ref.current = el;
    }
  };

  const setPanel2 = (el: HTMLDivElement | null) => {
    internalPanel2Ref.current = el;
    if (panel2Ref) {
      panel2Ref.current = el;
    }
  };

  const setPanel3 = (el: HTMLDivElement | null) => {
    internalPanel3Ref.current = el;
    if (panel3Ref) {
      panel3Ref.current = el;
    }
  };

  return (
    <div
      ref={ref}
      className="infra-visualization"
      style={{
        display: "flex",
        alignItems: "stretch",
        position: "relative",
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* Central Connecting Pathway (Curved Orange Arc with Nodes) */}
      <div className="infra-arc-container" style={{ position: "relative" }}>
        <ConnectingArc
          nodeY1={positions.y1}
          nodeY2={positions.y2}
          nodeY3={positions.y3}
          height={positions.height}
          arcPathRef={arcPathRef}
          nodesRef={nodesRef}
          connectorLinesRef={connectorLinesRef}
        />
      </div>

      {/* Stack of Three Translucent Institutional Panels */}
      <div
        ref={stackRef}
        className="infra-panels-stack"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          flex: 1,
          width: "100%",
        }}
      >
        <BankingPanel ref={setPanel1} />
        <CreditPanel ref={setPanel2} />
        <CompliancePanel ref={setPanel3} />
      </div>
    </div>
  );
});

export default InfrastructureVisualization;
