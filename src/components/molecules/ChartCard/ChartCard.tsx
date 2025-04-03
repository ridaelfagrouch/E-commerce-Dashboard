import React, { useEffect, useRef, useState } from "react";
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
  aspectRatio?: number;
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
  aspectRatio = 2,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if mobile
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Function to update chart dimensions
  const updateChartDimensions = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      checkIfMobile();
    }
  };

  // Initial setup and resize listener
  useEffect(() => {
    updateChartDimensions();

    const handleResize = () => {
      updateChartDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Chart creation/update effect
  useEffect(() => {
    if (chartRef.current && containerWidth > 0) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Calculate dimensions based on chart type
        const isPieOrDoughnut = ["pie", "doughnut"].includes(chartConfig.type);
        const effectiveAspectRatio = isPieOrDoughnut ? 1 : aspectRatio;

        // Create new chart with responsive options
        const updatedConfig = {
          ...chartConfig,
          options: {
            ...chartConfig.options,
            maintainAspectRatio: true,
            responsive: true,
            aspectRatio: isMobile
              ? Math.min(effectiveAspectRatio, 1.2)
              : effectiveAspectRatio,
          },
        };

        chartInstance.current = new Chart(ctx, updatedConfig);
      }
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartConfig, containerWidth, aspectRatio, isMobile]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center">
          {icon && <span className="text-gray-500 mr-2">{icon}</span>}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {tabs && activeTab && onTabChange && (
          <div className="w-full sm:w-auto">
            <TabGroup
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={onTabChange}
              size="sm"
            />
          </div>
        )}
      </div>
      <div className="p-4 flex-grow" ref={containerRef}>
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            minHeight: `${chartHeight}px`,
            maxHeight: `${chartHeight * 1.5}px`,
          }}
        >
          <canvas ref={chartRef} />
        </div>
      </div>
      {footer && <div className="px-4 py-3 border-t mt-auto">{footer}</div>}
    </div>
  );
};

export default ChartCard;
