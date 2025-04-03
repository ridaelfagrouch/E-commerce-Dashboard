import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";

interface OrderData {
  date: Date;
  orders: number;
  revenue: number;
  activityLevel: "low" | "medium" | "high";
  completed: number;
  processing: number;
  pending: number;
}

// Mock data generator with more realistic patterns
const generateMockData = (startDate: Date, endDate: Date): OrderData[] => {
  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) => {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Generate more realistic order numbers
    const baseOrders = isWeekend ? 5 : 10;
    const randomVariation = Math.floor(Math.random() * 8) - 4; // -4 to +4
    const orders = Math.max(0, baseOrders + randomVariation);

    // Calculate revenue with some variation
    const avgOrderValue = 100 + Math.floor(Math.random() * 50); // $100-$150 per order
    const revenue = orders * avgOrderValue;

    // Determine activity level based on orders
    let activityLevel: "low" | "medium" | "high" = "low";
    if (orders > 12) activityLevel = "high";
    else if (orders > 6) activityLevel = "medium";

    // Calculate status breakdowns
    const completed = Math.floor(orders * 0.6);
    const processing = Math.floor(orders * 0.25);
    const pending = orders - completed - processing;

    return {
      date,
      orders,
      revenue,
      activityLevel,
      completed,
      processing,
      pending,
    };
  });
};

const OrderActivity: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [periodFilter, setPeriodFilter] = useState<
    "Today" | "This Week" | "This Month"
  >("This Week");
  const [allOrderData, setAllOrderData] = useState<OrderData[]>([]);
  const [visibleOrderData, setVisibleOrderData] = useState<OrderData[]>([]);

  // Generate initial data for a longer period (e.g., 3 months)
  useEffect(() => {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const initialData = generateMockData(threeMonthsAgo, today);
    setAllOrderData(initialData);
  }, []);

  // Filter visible data based on period and current date
  useEffect(() => {
    if (allOrderData.length === 0) return;

    let filteredData: OrderData[] = [];
    let periodStart: Date;
    let periodEnd: Date;

    switch (periodFilter) {
      case "Today":
        periodStart = currentDate;
        periodEnd = currentDate;
        break;
      case "This Week": {
        periodStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        periodEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
        break;
      }
      case "This Month": {
        periodStart = startOfMonth(currentDate);
        periodEnd = endOfMonth(currentDate);
        break;
      }
    }

    filteredData = allOrderData.filter((data) => {
      const date = new Date(data.date);
      return date >= periodStart && date <= periodEnd;
    });

    setVisibleOrderData(filteredData);
  }, [periodFilter, currentDate, allOrderData]);

  // Navigation functions
  const navigate = (direction: "prev" | "next") => {
    const amount = direction === "prev" ? -1 : 1;

    switch (periodFilter) {
      case "Today":
        setCurrentDate((prev) => addDays(prev, amount));
        break;
      case "This Week":
        setCurrentDate((prev) => addDays(prev, amount * 7));
        break;
      case "This Month": {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + amount);
        setCurrentDate(newDate);
        break;
      }
    }
  };

  // Find the selected day's data
  const selectedDayData =
    visibleOrderData.find((data) => isSameDay(data.date, currentDate)) ||
    visibleOrderData[0];

  // Calculate totals for the current period
  const periodTotal = {
    orders: visibleOrderData.reduce((sum, day) => sum + day.orders, 0),
    revenue: visibleOrderData.reduce((sum, day) => sum + day.revenue, 0),
    completed: visibleOrderData.reduce((sum, day) => sum + day.completed, 0),
    processing: visibleOrderData.reduce((sum, day) => sum + day.processing, 0),
    pending: visibleOrderData.reduce((sum, day) => sum + day.pending, 0),
  };

  // Get period label
  const getPeriodLabel = () => {
    switch (periodFilter) {
      case "Today":
        return format(currentDate, "MMMM d, yyyy");
      case "This Week": {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
        return `${format(weekStart, "M/d/yyyy")} - ${format(
          weekEnd,
          "M/d/yyyy"
        )}`;
      }
      case "This Month":
        return format(currentDate, "MMMM yyyy");
      default:
        return "";
    }
  };

  // Activity color helper
  const getActivityColorClass = (level: string) => {
    switch (level) {
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-orange-500";
      case "low":
        return "text-green-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            Order Activity
          </h2>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          {["Today", "This Week", "This Month"].map((period) => (
            <button
              key={period}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                periodFilter === period
                  ? "bg-blue-50 text-blue-600 ring-1 ring-blue-600/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setPeriodFilter(period as typeof periodFilter)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 mb-6" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <div className="w-full lg:w-2/3">
          {/* Period Header with Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate("prev")}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {periodFilter === "Today"
                  ? "Daily"
                  : periodFilter === "This Week"
                  ? "Weekly"
                  : "Monthly"}{" "}
                Orders
              </h3>
              <p className="text-sm text-gray-500 mt-1">{getPeriodLabel()}</p>
              {isSameDay(currentDate, new Date()) && (
                <p className="text-sm text-blue-600 mt-1">Today</p>
              )}
            </div>

            <button
              onClick={() => navigate("next")}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Days Grid */}
          <div
            className={`grid ${
              periodFilter === "Today"
                ? "grid-cols-1"
                : periodFilter === "This Week"
                ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-7"
                : "grid-cols-2 sm:grid-cols-4 md:grid-cols-7"
            } gap-3 mb-8`}
          >
            {visibleOrderData.map((day, index) => {
              const isSelected = isSameDay(day.date, currentDate);
              const isToday = isSameDay(day.date, new Date());

              return (
                <div
                  key={index}
                  className={`relative border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? "ring-2 ring-blue-600 bg-blue-50/50"
                      : isToday
                      ? "border-blue-200 bg-blue-50/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setCurrentDate(day.date)}
                >
                  <div className="text-center mb-2">
                    <div className="text-sm font-medium text-gray-600">
                      {format(day.date, "EEE")}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {format(day.date, "d")}
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="font-medium text-gray-900">
                      {day.orders} orders
                    </div>
                    <div className="text-sm text-gray-600">
                      ${day.revenue.toFixed(2)}
                    </div>
                  </div>

                  <div
                    className={`text-center text-xs font-medium mt-2 py-1 rounded-full ${
                      day.activityLevel === "high"
                        ? "bg-orange-100 text-orange-700"
                        : day.activityLevel === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {day.activityLevel} activity
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Day Details */}
          {selectedDayData && (
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {format(selectedDayData.date, "EEEE, MMMM d, yyyy")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500">Total Orders</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1">
                    {selectedDayData.orders}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500">Total Revenue</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1">
                    ${selectedDayData.revenue.toFixed(2)}
                  </div>
                </div>
              </div>

              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Order Status Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="text-sm font-medium">Completed</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedDayData.completed}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedDayData.orders > 0
                      ? Math.round(
                          (selectedDayData.completed / selectedDayData.orders) *
                            100
                        )
                      : 0}
                    % of total
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="text-sm font-medium">Processing</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedDayData.processing}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedDayData.orders > 0
                      ? Math.round(
                          (selectedDayData.processing /
                            selectedDayData.orders) *
                            100
                        )
                      : 0}
                    % of total
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="text-sm font-medium">Pending</div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedDayData.pending}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedDayData.orders > 0
                      ? Math.round(
                          (selectedDayData.pending / selectedDayData.orders) *
                            100
                        )
                      : 0}
                    % of total
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 lg:border-l lg:pl-6">
          <div className="bg-gray-50 rounded-lg p-4 md:p-6">
            <div className="text-sm text-gray-500 mb-2">{getPeriodLabel()}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Total Orders
                </h3>
                <div className="text-3xl font-bold text-gray-900">
                  {periodTotal.orders}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Total Revenue
                </h3>
                <div className="text-3xl font-bold text-gray-900">
                  ${periodTotal.revenue.toFixed(2)}
                </div>
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Order Status
            </h3>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{periodTotal.completed}</span>
                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      {periodTotal.orders > 0
                        ? Math.round(
                            (periodTotal.completed / periodTotal.orders) * 100
                          )
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {periodTotal.processing}
                    </span>
                    <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                      {periodTotal.orders > 0
                        ? Math.round(
                            (periodTotal.processing / periodTotal.orders) * 100
                          )
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{periodTotal.pending}</span>
                    <div className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                      {periodTotal.orders > 0
                        ? Math.round(
                            (periodTotal.pending / periodTotal.orders) * 100
                          )
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderActivity;
