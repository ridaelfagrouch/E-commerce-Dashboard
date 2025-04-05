import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { LucideIcon } from "lucide-react";
import StatNumber from "../../atoms/StatNumber/StatNumber";
import Trend from "../../atoms/Trend/Trend";

interface LineChartCardProps {
  title: string;
  value: string | number;
  trend: number;
  data: number[];
  labels: string[];
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  chartColor: string;
  height?: number;
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  value,
  trend,
  data,
  labels,
  icon: Icon,
  iconBgColor,
  iconColor,
  chartColor,
  height = 120,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: chartColor,
            backgroundColor: `${chartColor}15`,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, chartColor]);

  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow duration-300 p-6">
      <div className="flex justify-between items-start">
        <StatNumber value={value} label={title} />
        <div className={`${iconBgColor} p-2 rounded-lg shadow-sm`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <Trend value={trend} className="mt-4 p-2 rounded-md bg-opacity-50" />
      <div style={{ height: `${height}px` }} className="mt-4">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default LineChartCard;
