"use client";

import React, { forwardRef } from "react";

export interface ConnectingArcProps {
  nodeY1: number;
  nodeY2: number;
  nodeY3: number;
  height: number;
  arcPathRef?: React.RefObject<SVGPathElement | null>;
  nodesRef?: React.RefObject<SVGGElement | null>;
  connectorLinesRef?: React.RefObject<SVGGElement | null>;
}

export const ConnectingArc = forwardRef<SVGSVGElement, ConnectingArcProps>(
  function ConnectingArc(
    {
      nodeY1,
      nodeY2,
      nodeY3,
      height,
      arcPathRef,
      nodesRef,
      connectorLinesRef,
    },
    ref
  ) {
    const width = 54;
    const node1X = 34;
    const node2X = 12;
    const node3X = 34;
    const rightEdge = width;

    // Smooth quadratic bezier curving outwards along the left edge
    const arcPathData = `M ${node1X} ${nodeY1} Q 2 ${nodeY2} ${node3X} ${nodeY3}`;

    return (
      <svg
        ref={ref}
        className="infra-connecting-arc"
        width={width}
        height={height || 480}
        viewBox={`0 0 ${width} ${height || 480}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          flexShrink: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Subtle Orange Glow Filter */}
          <filter id="infra-arc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.960
                0 0 0 0 0.509
                0 0 0 0 0.125
                0 0 0 0.6 0
              "
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Node Glow Gradient */}
          <radialGradient id="infra-node-halo">
            <stop offset="0%" stopColor="#F58220" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#F58220" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F58220" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow Layer Behind Main Arc */}
        <path
          d={arcPathData}
          stroke="#F58220"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#infra-arc-glow)"
          opacity="0.5"
        />

        {/* Crisp Main Arc Path */}
        <path
          ref={arcPathRef}
          className="infra-arc-path"
          d={arcPathData}
          stroke="#F58220"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Horizontal Connector Stems into Panels */}
        <g ref={connectorLinesRef} className="infra-connectors">
          {/* Stem 1 */}
          <line
            x1={node1X}
            y1={nodeY1}
            x2={rightEdge}
            y2={nodeY1}
            stroke="#F58220"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.8"
          />
          {/* Stem 2 */}
          <line
            x1={node2X}
            y1={nodeY2}
            x2={rightEdge}
            y2={nodeY2}
            stroke="#F58220"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.8"
          />
          {/* Stem 3 */}
          <line
            x1={node3X}
            y1={nodeY3}
            x2={rightEdge}
            y2={nodeY3}
            stroke="#F58220"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.8"
          />
        </g>

        {/* Three Illuminated Circular Nodes */}
        <g ref={nodesRef} className="infra-nodes">
          {/* Node 01 */}
          <g className="arc-node" transform={`translate(${node1X}, ${nodeY1})`}>
            <circle r="11" fill="url(#infra-node-halo)" />
            <circle r="6" fill="#0B0D10" stroke="#F58220" strokeWidth="1.8" />
            <circle r="2.2" fill="#FFFFFF" />
          </g>

          {/* Node 02 */}
          <g className="arc-node" transform={`translate(${node2X}, ${nodeY2})`}>
            <circle r="11" fill="url(#infra-node-halo)" />
            <circle r="6" fill="#0B0D10" stroke="#F58220" strokeWidth="1.8" />
            <circle r="2.2" fill="#FFFFFF" />
          </g>

          {/* Node 03 */}
          <g className="arc-node" transform={`translate(${node3X}, ${nodeY3})`}>
            <circle r="11" fill="url(#infra-node-halo)" />
            <circle r="6" fill="#0B0D10" stroke="#F58220" strokeWidth="1.8" />
            <circle r="2.2" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    );
  }
);

export default ConnectingArc;

