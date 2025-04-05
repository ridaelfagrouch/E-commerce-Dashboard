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
        cutout: "65%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        layout: {
          padding: {
            top: 5,
            bottom: 5,
            left: 10,
            right: 10,
          },
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
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center">
        <div
          className="h-full flex flex-col items-center justify-center"
          style={{ marginTop: "50px" }}
        >
          <div className="text-base font-bold text-gray-900 leading-tight">
            ${value.toFixed(2)}
          </div>
          <div className="text-[10px] text-gray-500 leading-tight mt-0.5">
            Order Value
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
