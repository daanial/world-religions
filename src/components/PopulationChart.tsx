import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import {
  ANCHOR_YEARS,
  CATEGORY_COLORS,
  LAST_OBSERVED_YEAR,
  RELIGION_CATEGORIES,
  YEAR_MAX,
  YEAR_MIN,
  buildDenseSeries,
  formatPopulation,
  interpolatePopulation,
  type ReligionCategory,
} from "../data/population";

type ViewMode = "absolute" | "percentage";

const PLAY_YEARS_PER_SEC = 18;
const DENSE_STEP = 1;

interface StackRow {
  year: number;
  [key: string]: number;
}

function toStackRows(mode: ViewMode): StackRow[] {
  return buildDenseSeries(DENSE_STEP).map((row) => {
    const source = mode === "absolute" ? row.values : row.percentages;
    const out: StackRow = { year: row.year };
    for (const cat of RELIGION_CATEGORIES) {
      out[cat] = source[cat];
    }
    return out;
  });
}

function yMaxForMode(mode: ViewMode): number {
  if (mode === "percentage") return 100;
  const rows = buildDenseSeries(DENSE_STEP);
  let max = 0;
  for (const row of rows) {
    const total = RELIGION_CATEGORIES.reduce((s, c) => s + row.values[c], 0);
    max = Math.max(max, total);
  }
  return max * 1.04;
}

export default function PopulationChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("absolute");
  const [currentYear, setCurrentYear] = useState<number>(YEAR_MIN);
  const [playing, setPlaying] = useState(true);
  const [size, setSize] = useState({ width: 960, height: 420 });

  const margin = { top: 28, right: 24, bottom: 72, left: 64 };
  const innerW = size.width - margin.left - margin.right;
  const innerH = size.height - margin.top - margin.bottom;

  const xScale = useMemo(
    () => d3.scaleLinear().domain([YEAR_MIN, YEAR_MAX]).range([0, innerW]),
    [innerW],
  );

  const yScale = useMemo(
    () => d3.scaleLinear().domain([0, yMaxForMode(viewMode)]).range([innerH, 0]).nice(),
    [innerH, viewMode],
  );

  const stackRows = useMemo(() => toStackRows(viewMode), [viewMode]);

  const stackSeries = useMemo(() => {
    const stack = d3
      .stack<StackRow>()
      .keys(RELIGION_CATEGORIES)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
    return stack(stackRows);
  }, [stackRows]);

  const areaGen = useMemo(
    () =>
      d3
        .area<d3.SeriesPoint<StackRow>>()
        .x((d) => xScale(d.data.year))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]))
        .curve(d3.curveLinear),
    [xScale, yScale],
  );

  const currentSnap = useMemo(() => interpolatePopulation(currentYear), [currentYear]);

  const stopPlay = useCallback(() => {
    setPlaying(false);
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastFrameRef.current = null;
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setSize({ width: Math.max(640, w), height: 420 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;

    const tick = (ts: number) => {
      if (lastFrameRef.current == null) lastFrameRef.current = ts;
      const dt = (ts - lastFrameRef.current) / 1000;
      lastFrameRef.current = ts;

      setCurrentYear((y) => Math.min(y + dt * PLAY_YEARS_PER_SEC, YEAR_MAX));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastFrameRef.current = null;
    };
  }, [playing]);

  useEffect(() => {
    if (playing && currentYear >= YEAR_MAX) {
      setPlaying(false);
    }
  }, [playing, currentYear]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");

    defs
      .append("clipPath")
      .attr("id", "pop-clip")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", xScale(currentYear))
      .attr("height", innerH);

    defs
      .append("pattern")
      .attr("id", "pop-projected-hatch")
      .attr("width", 8)
      .attr("height", 8)
      .attr("patternTransform", "rotate(45)")
      .append("rect")
      .attr("width", 4)
      .attr("height", 8)
      .attr("fill", "rgba(255,255,255,0.08)");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const observedEndX = xScale(LAST_OBSERVED_YEAR);
    const projectedStartX = observedEndX;

    g.append("rect")
      .attr("class", "pop-watermark")
      .attr("x", projectedStartX)
      .attr("y", 0)
      .attr("width", Math.max(0, innerW - projectedStartX))
      .attr("height", innerH)
      .attr("fill", "rgba(255,255,255,0.015)");

    g.append("text")
      .attr("x", projectedStartX + (innerW - projectedStartX) / 2)
      .attr("y", innerH / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(255,255,255,0.06)")
      .attr("font-size", "28px")
      .attr("font-weight", 700)
      .attr("letter-spacing", "0.35em")
      .attr("pointer-events", "none")
      .text("PROJECTED");

    const observedLayer = g.append("g").attr("clip-path", "url(#pop-clip)");

    stackSeries.forEach((series) => {
      const cat = series.key as ReligionCategory;
      const observedData = series.filter((d) => d.data.year <= LAST_OBSERVED_YEAR);
      if (observedData.length < 2) return;

      observedLayer
        .append("path")
        .attr("class", "pop-area pop-area--observed")
        .attr("data-category", cat)
        .attr("d", areaGen(observedData))
        .attr("fill", CATEGORY_COLORS[cat])
        .attr("opacity", 0.88);
    });

    const projectedLayer = g.append("g").attr("clip-path", "url(#pop-clip)");

    stackSeries.forEach((series) => {
      const cat = series.key as ReligionCategory;
      const projectedData = series.filter((d) => d.data.year >= LAST_OBSERVED_YEAR);
      if (projectedData.length < 2) return;

      projectedLayer
        .append("path")
        .attr("class", "pop-area pop-area--projected")
        .attr("data-category", cat)
        .attr("d", areaGen(projectedData))
        .attr("fill", CATEGORY_COLORS[cat])
        .attr("opacity", 0.45)
        .attr("stroke", CATEGORY_COLORS[cat])
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "4 3");
    });

    defs
      .append("clipPath")
      .attr("id", "pop-projected-clip")
      .append("rect")
      .attr("x", projectedStartX)
      .attr("y", 0)
      .attr("width", Math.max(0, xScale(currentYear) - projectedStartX))
      .attr("height", innerH);

    g.append("rect")
      .attr("clip-path", "url(#pop-projected-clip)")
      .attr("x", projectedStartX)
      .attr("y", 0)
      .attr("width", Math.max(0, innerW - projectedStartX))
      .attr("height", innerH)
      .attr("fill", "url(#pop-projected-hatch)")
      .attr("pointer-events", "none");

    g.append("line")
      .attr("class", "pop-seam")
      .attr("x1", observedEndX)
      .attr("x2", observedEndX)
      .attr("y1", 0)
      .attr("y2", innerH)
      .attr("stroke", "rgba(230,180,80,0.45)")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "6 4");

    g.append("g")
      .selectAll("line")
      .data(ANCHOR_YEARS)
      .join("line")
      .attr("class", "pop-anchor")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", innerH)
      .attr("stroke", (d) =>
        d > LAST_OBSERVED_YEAR ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.18)",
      )
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", (d) => (d > LAST_OBSERVED_YEAR ? "2 4" : "none"));

    g.append("line")
      .attr("class", "pop-playhead")
      .attr("x1", xScale(currentYear))
      .attr("x2", xScale(currentYear))
      .attr("y1", -8)
      .attr("y2", innerH + 8)
      .attr("stroke", "var(--gold)")
      .attr("stroke-width", 2)
      .attr("pointer-events", "none");

    g.append("circle")
      .attr("class", "pop-playhead-dot")
      .attr("cx", xScale(currentYear))
      .attr("cy", -4)
      .attr("r", 5)
      .attr("fill", "var(--gold)")
      .attr("stroke", "var(--bg)")
      .attr("stroke-width", 2);

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) =>
        viewMode === "percentage" ? `${d}%` : formatPopulation(Number(d)),
      );

    g.append("g")
      .attr("class", "pop-y-axis")
      .call(yAxis as d3.Axis<d3.NumberValue>)
      .call((sel) => sel.select(".domain").remove())
      .call((sel) =>
        sel
          .selectAll("line")
          .attr("stroke", "rgba(255,255,255,0.06)")
          .attr("stroke-dasharray", "2 4"),
      )
      .call((sel) => sel.selectAll("text").attr("fill", "var(--text-dim)").attr("font-size", "11px"));

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues([...ANCHOR_YEARS])
      .tickFormat((d) => String(d));

    g.append("g")
      .attr("class", "pop-x-axis")
      .attr("transform", `translate(0,${innerH})`)
      .call(xAxis as d3.Axis<d3.NumberValue>)
      .call((sel) => sel.select(".domain").attr("stroke", "rgba(255,255,255,0.12)"))
      .call((sel) =>
        sel
          .selectAll("text")
          .attr("fill", (d) =>
            Number(d) > LAST_OBSERVED_YEAR ? "rgba(255,255,255,0.35)" : "var(--text-dim)",
          )
          .attr("font-size", "11px"),
      )
      .call((sel) =>
        sel
          .selectAll("line")
          .attr("stroke", (d) =>
            Number(d) > LAST_OBSERVED_YEAR ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)",
          ),
      );

    g.append("text")
      .attr("x", innerW / 2)
      .attr("y", innerH + 52)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--text-dim)")
      .attr("font-size", "11px")
      .attr("letter-spacing", "0.12em")
      .text("YEAR (spacing reflects elapsed time · ticks only at measured anchor years)");
  }, [
    areaGen,
    currentYear,
    innerH,
    innerW,
    margin.left,
    margin.top,
    stackSeries,
    viewMode,
    xScale,
    yScale,
  ]);

  const topCategories = useMemo(() => {
    return [...RELIGION_CATEGORIES]
      .map((cat) => ({
        cat,
        value: viewMode === "absolute" ? currentSnap.values[cat] : currentSnap.percentages[cat],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [currentSnap, viewMode]);

  return (
    <section className="pop-chart reveal" aria-labelledby="pop-chart-title">
      <header className="pop-chart__head">
        <div>
          <h2 id="pop-chart-title" className="pop-chart__title">
            Global religious populations
          </h2>
          <p className="pop-chart__lead">
            Eight unified categories across sparse anchor years. Scrub or play to explore — values
            tween smoothly between real measurements only.
          </p>
        </div>

        <div className="pop-chart__controls">
          <div className="pop-chart__toggle" role="group" aria-label="View mode">
            <button
              type="button"
              className={`pop-toggle-btn${viewMode === "absolute" ? " pop-toggle-btn--active" : ""}`}
              onClick={() => setViewMode("absolute")}
            >
              Absolute
            </button>
            <button
              type="button"
              className={`pop-toggle-btn${viewMode === "percentage" ? " pop-toggle-btn--active" : ""}`}
              onClick={() => setViewMode("percentage")}
            >
              % of world
            </button>
          </div>

          <button
            type="button"
            className="pop-play-btn"
            onClick={togglePlay}
            aria-label={playing ? "Pause animation" : "Play animation"}
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </header>

      <div className="pop-chart__legend">
        {RELIGION_CATEGORIES.map((cat) => (
          <span key={cat} className="pop-legend-item">
            <span className="pop-legend-item__swatch" style={{ background: CATEGORY_COLORS[cat] }} />
            {cat}
          </span>
        ))}
      </div>

      <div className="pop-chart__meta glass">
        <div className="pop-chart__year">
          <span className="pop-chart__year-label">Year</span>
          <strong>{Math.round(currentYear)}</strong>
          {currentSnap.isProjected && <span className="pop-chart__badge">Projected</span>}
        </div>
        <div className="pop-chart__stats">
          {topCategories.map(({ cat, value }) => (
            <div key={cat} className="pop-stat">
              <span className="pop-stat__dot" style={{ background: CATEGORY_COLORS[cat] }} />
              <span className="pop-stat__name">{cat}</span>
              <span className="pop-stat__val">
                {viewMode === "absolute" ? formatPopulation(value) : `${value.toFixed(1)}%`}
              </span>
            </div>
          ))}
        </div>
        <div className="pop-chart__world">
          World pop. <strong>{formatPopulation(currentSnap.worldPopulation)}</strong>
        </div>
      </div>

      <div className="pop-chart__canvas-wrap card" ref={wrapRef}>
        <svg
          ref={svgRef}
          width={size.width}
          height={size.height}
          role="img"
          aria-label="Animated stacked area chart of global religious populations"
        />
      </div>

      <div className="pop-scrubber">
        <input
          type="range"
          className="pop-scrubber__input"
          min={YEAR_MIN}
          max={YEAR_MAX}
          step={1}
          value={Math.round(currentYear)}
          onChange={(e) => {
            stopPlay();
            setCurrentYear(Number(e.target.value));
          }}
          aria-label="Scrub through years"
          list="pop-anchor-markers"
        />
        <datalist id="pop-anchor-markers">
          {ANCHOR_YEARS.map((y) => (
            <option key={y} value={y} label={String(y)} />
          ))}
        </datalist>
        <div className="pop-scrubber__labels">
          <span>{YEAR_MIN}</span>
          <span className="pop-scrubber__observed">{LAST_OBSERVED_YEAR} · last estimate</span>
          <span>{YEAR_MAX}</span>
        </div>
      </div>

      <p className="pop-chart__note">
        Anchor years only — animation eases between measured points, not fabricated yearly census
        data. Beyond {LAST_OBSERVED_YEAR}, hatched areas are projections from Pew 2015 and CSGC 2026
        models.
      </p>
    </section>
  );
}
