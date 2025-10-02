"use client";

import dynamic from "next/dynamic";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((mod) => mod.ResponsiveLine),
  { ssr: false },
);

const ResponsiveBar = dynamic(
  () => import("@nivo/bar").then((mod) => mod.ResponsiveBar),
  { ssr: false },
);

const darkTheme = {
  textColor: "#ffffff",
  tooltip: { container: { background: "#2a3b50" } },
  axis: {
    domain: { line: { stroke: "#777777" } },
    ticks: { line: { stroke: "#777777" }, text: { fill: "#ffffff" } },
    legend: { text: { fill: "#ffffff" } },
  },
  grid: { line: { stroke: "#333333" } },
};
type Props = {
  lineData: any;
  barData: any;
};

export default function Chart({ lineData, barData }: Props) {
  return (
    <div className="bg-transparent p-5">
      <div className="h-[300px]">
        <ResponsiveLine
          data={lineData}
          margin={{ top: 20, right: 30, bottom: 30, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          axisBottom={{ tickSize: 5, tickPadding: 5 }}
          axisLeft={{ tickSize: 5, tickPadding: 5 }}
          colors={["#4c9aff"]}
          enableArea={true}
          pointSize={8}
          pointColor="#4c9aff"
          pointBorderWidth={2}
          pointBorderColor="#1f2a37"
          useMesh={true}
          theme={darkTheme}
        />
      </div>

      <div className="h-[300px] mt-12">
        <ResponsiveBar
          data={barData}
          keys={["hours"]}
          indexBy="day"
          margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
          colors={["#4c9aff"]}
          padding={0.3}
          axisBottom={{ tickSize: 5, tickPadding: 5 }}
          axisLeft={{ tickSize: 5, tickPadding: 5 }}
          enableGridY={true}
          theme={darkTheme}
        />
      </div>
    </div>
  );
}
