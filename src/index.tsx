import { seqNumbers } from "@/utils/array-utils";
import { mountAppRoot } from "@/utils/mount-app-root";
import "./styling/page.css";
import "./styling/utility-classes.css";

const EditorArea = () => {
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
      >
        <title>edit-area</title>
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
