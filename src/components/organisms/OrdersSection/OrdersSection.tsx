import React from "react";
import { ShoppingBag, LineChart } from "lucide-react";
import LineChartCard from "../../molecules/LineChartCard/LineChartCard";
import { useTranslation } from "react-i18next";

interface OrdersData {
  today: number;
  todayTrend: number;
  thisMonth: number;
  monthlyTrend: number;
  monthlyData: number[];
  labels: string[];
}

interface OrdersSectionProps {
  data: OrdersData;
}

const OrdersSection: React.FC<OrdersSectionProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Today's Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">
              {t("analytics.orders.today")}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {data.today}
            </h3>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <span
            className={`text-${
              data.todayTrend >= 0 ? "green" : "red"
            }-500 font-medium`}
          >
            {data.todayTrend > 0 ? "+" : ""}
            {data.todayTrend}%
          </span>
          <span className="text-gray-500 ml-1">
            {t("analytics.orders.trend")}
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{t("analytics.orders.progress")}</span>
            <span>78%</span>
          </div>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: "78%" }}
            />
          </div>
        </div>
      </div>

      {/* Monthly Orders */}
      <LineChartCard
        title={t("analytics.orders.thisMonth")}
        value={data.thisMonth}
        trend={data.monthlyTrend}
        data={data.monthlyData}
        labels={data.labels}
        icon={LineChart}
        iconBgColor="bg-green-50"
        iconColor="text-green-600"
        chartColor="#10B981"
        height={150}
        trendLabel={t("analytics.orders.trend")}
      />
    </div>
  );
};

export default OrdersSection;
