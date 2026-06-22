import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useNavigate } from "react-router-dom";
import { RELIGIONS, type Religion } from "../data/religions";
import { formatYear, formatYearShort } from "../lib/format";

interface TimelineChartProps {
  accent: string; // current accent (from hovered/selected religion)
  filter: { extinct: boolean; living: boolean };
}

const YEAR_MIN = -3600;
const YEAR_MAX = new Date().getFullYear();

// Eras for background bands
const ERAS = [
  { from: -3600, to: -1200, name: "Bronze Age", color: "rgba(230,180,80,0.04)" },
  { from: -1200, to: -500, name: "Iron Age", color: "rgba(155,125,224,0.04)" },
  { from: -500, to: 500, name: "Axial Age", color: "rgba(63,184,175,0.05)" },
  { from: 500, to: 1500, name: "Medieval", color: "rgba(216,72,91,0.04)" },
  { from: 1500, to: YEAR_MAX, name: "Modern", color: "rgba(106,123,216,0.04)" },
];

// Lane assignment by family to reduce overlap
const FAMILY_LANE: Record<string, number> = {
  Abrahamic: 0,
  Indian: 1,
  Iranian: 2,
  "East Asian": 3,
  "Indo-European": 4,
  African: 5,
  Indigenous: 6,
  Modern: 7,
};

export default function TimelineChart({ accent }: TimelineChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  // dimensions
  const [size, setSize] = useState({ width: 1000, height: 460 });
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setSize({ width: Math.max(640, w), height: 460 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const margin = { top: 50, right: 40, bottom: 60, left: 130 };
  const innerW = size.width - margin.left - margin.right;
  const innerH = size.height - margin.top - margin.bottom;

  const xScale = useMemo(
    () => d3.scaleLinear().domain([YEAR_MIN, YEAR_MAX]).range([0, innerW]),
    [innerW]
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // clip path so lifespans don't overflow
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "tl-clip")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", innerW)
      .attr("height", innerH);

    const chart = g.append("g").attr("clip-path", "url(#tl-clip)");

    // ---- Era bands ----
    ERAS.forEach((era) => {
      const x0 = xScale(era.from);
      const x1 = xScale(era.to);
      chart
        .append("rect")
        .attr("x", x0)
        .attr("y", 0)
        .attr("width", Math.max(0, x1 - x0))
        .attr("height", innerH)
        .attr("fill", era.color);
      // era label
      g.append("text")
        .attr("x", (x0 + x1) / 2)
        .attr("y", -18)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--text-dim)")
        .attr("font-size", "10px")
        .attr("letter-spacing", "0.18em")
        .attr("text-transform", "uppercase")
        .text(era.name);
    });

    // ---- Gridlines + axis ----
    const tickValues = [-3500, -2500, -1500, -500, 0, 500, 1000, 1500, 1800, YEAR_MAX];
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(tickValues)
      .tickFormat((d) => formatYearShort(Number(d)))
      .tickSize(innerH);

    const axisG = g
      .append("g")
      .attr("class", "tl-axis")
      .call(xAxis as d3.Axis<d3.NumberValue>)
      .call((sel) => sel.select(".domain").remove());
    axisG
      .selectAll("line")
      .attr("stroke", "rgba(255,255,255,0.06)")
      .attr("stroke-dasharray", "2 4");
    axisG
      .selectAll("text")
      .attr("fill", "var(--text-dim)")
      .attr("font-size", "11px")
      .attr("dy", -4);
    axisG.selectAll("text").each(function () {
      const sel = d3.select(this);
      const y = sel.attr("y");
      sel.attr("y", Number(y) + innerH + 0);
    });

    // ---- Lane labels (family names on the left) ----
    const laneNames = [
      "Abrahamic",
      "Indian",
      "Iranian",
      "East Asian",
      "European",
      "African",
      "Indigenous",
      "Modern",
    ];
    const laneH = innerH / laneNames.length;
    g.append("g")
      .selectAll("text")
      .data(laneNames)
      .join("text")
      .attr("x", -16)
      .attr("y", (_, i) => i * laneH + laneH / 2)
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "middle")
      .attr("fill", "var(--text-dim)")
      .attr("font-size", "10.5px")
      .attr("letter-spacing", "0.08em")
      .text((d) => d.toUpperCase());

    // lane separators
    g.append("g")
      .selectAll("line")
      .data(laneNames.slice(1))
      .join("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", (_, i) => (i + 1) * laneH)
      .attr("y2", (_, i) => (i + 1) * laneH)
      .attr("stroke", "rgba(255,255,255,0.03)");

    // ---- Split connectors (lines from parent → child birth) ----
    const splitLines = RELIGIONS.filter((r) => r.splitsFrom);
    chart
      .append("g")
      .attr("class", "tl-splits")
      .selectAll("path")
      .data(splitLines)
      .join("path")
      .attr("d", (r) => {
        const parent = RELIGIONS.find((p) => p.id === r.splitsFrom);
        if (!parent) return "";
        const px = xScale(r.origin); // split happens at child's birth
        const py1 =
          (FAMILY_LANE[parent.family] ?? 4) * laneH + laneH / 2;
        const py2 = (FAMILY_LANE[r.family] ?? 4) * laneH + laneH / 2;
        return `M${px},${py1} C${px - 30},${py1} ${px - 30},${py2} ${px},${py2}`;
      })
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.18)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3 3");

    // ---- Lifespan bars ----
    const barH = laneH * 0.5;
    const barGroups = chart
      .append("g")
      .attr("class", "tl-bars")
      .selectAll<SVGGElement, Religion>("g.bar")
      .data(RELIGIONS)
      .join("g")
      .attr("class", "bar")
      .attr("data-id", (r) => r.id)
      .style("cursor", "pointer")
      .on("mouseenter", (_e, r) => setHovered(r.id))
      .on("mouseleave", () => setHovered(null))
      .on("click", (_e, r) => navigate(`/religion/${r.id}`));

    barGroups
      .append("rect")
      .attr("class", "tl-bar")
      .attr("x", (r) => xScale(r.origin))
      .attr("y", (r) => {
        const lane = FAMILY_LANE[r.family] ?? 4;
        return lane * laneH + (laneH - barH) / 2;
      })
      .attr("width", (r) => Math.max(3, xScale(r.ended ?? YEAR_MAX) - xScale(r.origin)))
      .attr("height", barH)
      .attr("rx", barH / 2)
      .attr("fill", (r) => (r.extinct ? "url(#extinct-grad)" : "url(#living-grad)"))
      .attr("stroke", (r) => r.accent)
      .attr("stroke-width", 1)
      .attr("opacity", 0.92);

    // extinct hatch pattern
    svg
      .append("defs")
      .append("pattern")
      .attr("id", "extinct-hatch")
      .attr("width", 6)
      .attr("height", 6)
      .attr("patternTransform", "rotate(45)")
      .append("rect")
      .attr("width", 3)
      .attr("height", 6)
      .attr("fill", "rgba(255,255,255,0.06)");

    // birth dot
    barGroups
      .append("circle")
      .attr("class", "tl-birth")
      .attr("cx", (r) => xScale(r.origin))
      .attr("cy", (r) => {
        const lane = FAMILY_LANE[r.family] ?? 4;
        return lane * laneH + laneH / 2;
      })
      .attr("r", 4)
      .attr("fill", (r) => r.accent)
      .attr("stroke", "var(--bg)")
      .attr("stroke-width", 1.5);

    // extinct X mark
    chart
      .append("g")
      .selectAll("text")
      .data(RELIGIONS.filter((r) => r.extinct && r.ended))
      .join("text")
      .attr("class", "tl-death")
      .attr("x", (r) => xScale(r.ended!))
      .attr("y", (r) => {
        const lane = FAMILY_LANE[r.family] ?? 4;
        return lane * laneH + laneH / 2 + 4;
      })
      .attr("font-size", "13px")
      .attr("fill", "var(--text-dim)")
      .attr("text-anchor", "middle")
      .text("†");

    // labels — only those with room
    barGroups
      .append("text")
      .attr("class", "tl-label")
      .attr("x", (r) => xScale(r.origin) + 10)
      .attr("y", (r) => {
        const lane = FAMILY_LANE[r.family] ?? 4;
        return lane * laneH + laneH / 2 + 3.5;
      })
      .attr("fill", "var(--text)")
      .attr("font-size", "11.5px")
      .attr("font-weight", 500)
      .text((r) => r.name);

    // "now" marker line
    chart
      .append("line")
      .attr("x1", xScale(YEAR_MAX))
      .attr("x2", xScale(YEAR_MAX))
      .attr("y1", 0)
      .attr("y2", innerH)
      .attr("stroke", "var(--gold)")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "2 3")
      .attr("opacity", 0.6);
  }, [size, xScale, margin.left, margin.top, innerH, innerW, navigate]);

  // highlight hovered bar via DOM mutation (cheap, avoids full redraw)
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll<SVGGElement, Religion>("g.bar").classed("is-hover", function (r) {
      return r.id === hovered;
    });
  }, [hovered]);

  const hoveredReligion = RELIGIONS.find((r) => r.id === hovered) || null;

  return (
    <div className="tl" ref={wrapRef}>
      <div
        className="tl__canvas"
        style={{ "--accent": hoveredReligion ? hoveredReligion.accent : accent } as React.CSSProperties}
      >
        <svg ref={svgRef} width={size.width} height={size.height} role="img" aria-label="Religion timeline" />
        {/* inline gradient defs */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="living-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </linearGradient>
            <linearGradient id="extinct-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {hoveredReligion && (
        <div className="tl__tooltip glass">
          <div className="tl__tooltip-dot" style={{ background: hoveredReligion.accent }} />
          <div>
            <div className="tl__tooltip-name">{hoveredReligion.name}</div>
            <div className="tl__tooltip-meta">
              {formatYear(hoveredReligion.origin)}
              {hoveredReligion.ended && ` – ${formatYear(hoveredReligion.ended)}`}
              {!hoveredReligion.ended && " – present"}
              {hoveredReligion.extinct && <span className="tl__tooltip-tag">Extinct</span>}
              {hoveredReligion.splitsFrom && (
                <span className="tl__tooltip-tag">
                  split from{" "}
                  {RELIGIONS.find((p) => p.id === hoveredReligion.splitsFrom)?.name}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
