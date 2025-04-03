import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { LucideIcon } from "lucide-react";

interface ChartData {
  label: string;
  value: number;
  percentage: number;
  trend: number;
}

interface DoughnutChartCardProps {
  title: string;
  subtitle: string;
  data: ChartData[];
  colors: string[];
  icon: LucideIcon;
  height?: number;
}

const DoughnutChartCard: React.FC<DoughnutChartCardProps> = ({
  title,
  subtitle,
  data,
  colors,
  icon: Icon,
  height = 300,
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
      type: "doughnut",
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => item.percentage),
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
            },
          },
        },
        cutout: "70%",
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, colors]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="bg-indigo-50 p-2 rounded-lg">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
      </div>
      <div style={{ height: `${height}px` }}>
        <canvas ref={chartRef} />
      </div>
      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span
                className={`ml-2 text-xs ${
                  item.trend > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.trend > 0 ? "+" : ""}
                {item.trend}%
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChartCard;
