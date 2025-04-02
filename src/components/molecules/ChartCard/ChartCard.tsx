import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import TabGroup from "../TabGroup/TabGroup";

interface ChartCardProps {
  title: string;
  icon?: React.ReactNode;
  tabs?: Array<{ id: string; label: string }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  chartConfig: any;
  chartHeight?: number;
  footer?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  icon,
  tabs,
  activeTab,
  onTabChange,
  chartConfig,
  chartHeight = 250,
  footer,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Create new chart instance
        chartInstance.current = new Chart(ctx, chartConfig);
      }
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartConfig]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          {icon && <span className="text-gray-500 mr-2">{icon}</span>}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {tabs && activeTab && onTabChange && (
          <TabGroup
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            size="sm"
          />
        )}
      </div>
      <div className="p-4">
        <div style={{ height: `${chartHeight}px` }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      {footer && <div className="px-4 py-3 border-t">{footer}</div>}
    </div>
  );
};

export default ChartCard;
