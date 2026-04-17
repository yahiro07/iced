import { seqNumbers } from "@/utils/array-utils";
import { mountAppRoot } from "@/utils/mount-app-root";
import "./styling/page.css";
import "./styling/utility-classes.css";
import { useCallback } from "react";
import { createStore } from "snap-store";

type Point = { x: number; y: number };

const store = createStore<{ points: Point[] }>({
  points: [],
});

const EditorArea = () => {
  const { points } = store.useSnapshot();
  const addPoint = useCallback((e: React.PointerEvent) => {
    const el = e.currentTarget as SVGRectElement;
    const rect = el.getBoundingClientRect();
    const po: Point = {
      x: e.clientX - rect.left - 200,
      y: e.clientY - rect.top - 200,
    };
    store.setPoints((prev) => [...prev, po]);
  }, []);

  return (
    <div
      css={{
        width: "400px",
        height: "400px",
        border: "solid 1px #888",
      }}
    >
      <svg
        width="400"
        height="400"
        viewBox="-200 -200 400 400"
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={addPoint}
      >
        <g stroke="#ccc">
          {seqNumbers(10).map((xi) => {
            const x = xi * 40 - 200;
            return <line key={x} x1={x} y1="-200" x2={x} y2="200" />;
          })}
          {seqNumbers(10).map((yi) => {
            const y = yi * 40 - 200;
            return <line key={y} x1="-200" y1={y} x2="200" y2={y} />;
          })}
        </g>
        <g>
          {points.map((point) => (
            <circle
              key={`${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r={2}
              fill="#a6f"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex-c" css={{ width: "100vw", height: "100vh" }}>
      <EditorArea />
    </div>
  );
};

mountAppRoot(<App />, "app");
