import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  height?: number;
  color?: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min,
  max,
  height = 120,
  color = "rgba(79, 70, 229, 0.9)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Calculate the percentage
    const percentage = ((value - min) / (max - min)) * 100;

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [percentage, 100 - percentage],
            backgroundColor: [color, "rgba(243, 244, 246, 0.5)"],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        layout: {
          padding: 20,
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [value, min, max, color]);

  return (
    <div style={{ height: `${height}px`, position: "relative" }}>
      <canvas ref={canvasRef} />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ marginTop: "40px" }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">${value}</div>
          <div className="text-sm text-gray-500">Average Order Value</div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
