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
  subMonths,
  addMonths,
  isWeekend,
  startOfDay,
  endOfDay,
  eachHourOfInterval,
} from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface HourlyData {
  hour: Date;
  orders: number;
  revenue: number;
  completed: number;
  processing: number;
  pending: number;
}

interface OrderData {
  date: Date;
  orders: number;
  revenue: number;
  activityLevel: "low" | "medium" | "high";
  completed: number;
  processing: number;
  pending: number;
  hourlyData?: HourlyData[];
}

// Seed data for consistent random generation
const generateSeed = (date: Date): number => {
  const dateString = format(date, "yyyy-MM-dd");
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Generate consistent random number based on seed
const seededRandom = (seed: number, min: number, max: number): number => {
  const x = Math.sin(seed++) * 10000;
  const rand = x - Math.floor(x);
  return Math.floor(rand * (max - min + 1)) + min;
};

// Generate hourly data for a specific day
const generateHourlyData = (date: Date, totalOrders: number): HourlyData[] => {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);
  const hours = eachHourOfInterval({ start: dayStart, end: dayEnd });

  // Initialize weights for each hour
  const hourlyWeights = hours.map((hour) => {
    const hourNum = hour.getHours();

    // Night (12 AM - 5 AM): Very low activity
    if (hourNum >= 0 && hourNum <= 5) return 0.1;

    // Early morning (6 AM - 7 AM): Low activity
    if (hourNum >= 6 && hourNum <= 7) return 0.3;

    // Morning peak (8 AM - 11 AM): High activity
    if (hourNum >= 8 && hourNum <= 11) return 1.5;

    // Lunch time (12 PM - 2 PM): Very high activity
    if (hourNum >= 12 && hourNum <= 14) return 2.0;

    // Afternoon (3 PM - 5 PM): High activity
    if (hourNum >= 15 && hourNum <= 17) return 1.5;

    // Evening (6 PM - 9 PM): Medium activity
    if (hourNum >= 18 && hourNum <= 21) return 1.0;

    // Late night (10 PM - 11 PM): Low activity
    return 0.2;
  });

  // Calculate the total weight
  const totalWeight = hourlyWeights.reduce((sum, weight) => sum + weight, 0);

  // First pass: Calculate the base distribution
  let remainingOrders = totalOrders;
  const hourlyOrders = hourlyWeights.map((weight) => {
    const orders = Math.floor((weight / totalWeight) * totalOrders);
    remainingOrders -= orders;
    return orders;
  });

  // Distribute remaining orders to peak hours
  while (remainingOrders > 0) {
    const peakHours = hourlyOrders
      .map((_, index) => ({
        index,
        weight: hourlyWeights[index],
      }))
      .filter((hour) => hour.weight > 1.0)
      .sort((a, b) => b.weight - a.weight);

    if (peakHours.length === 0) break;

    for (let i = 0; i < peakHours.length && remainingOrders > 0; i++) {
      hourlyOrders[peakHours[i].index]++;
      remainingOrders--;
    }
  }

  // Generate the final hourly data
  return hours.map((hour, index) => {
    const orders = hourlyOrders[index];
    const hourSeed = generateSeed(hour);

    // Calculate revenue (consistent per order in the same hour)
    const avgOrderValue = seededRandom(hourSeed + 1, 140, 170);
    const revenue = orders * avgOrderValue;

    // Calculate status breakdowns
    const completedRatio = seededRandom(hourSeed + 2, 55, 65) / 100;
    const processingRatio = seededRandom(hourSeed + 3, 20, 30) / 100;

    const completed = Math.round(orders * completedRatio);
    const processing = Math.round(orders * processingRatio);
    const pending = orders - completed - processing;

    return {
      hour,
      orders,
      revenue,
      completed,
      processing,
      pending,
    };
  });
};

// Modify generateMockData to include hourly data
const generateMockData = (startDate: Date, endDate: Date): OrderData[] => {
  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) => {
    const seed = generateSeed(date);
    const dayOfWeek = date.getDay();
    const isWeekendDay = isWeekend(date);
    const dayOfMonth = date.getDate();
    const month = date.getMonth();

    // Base orders with weekly patterns
    let baseOrders: number;
    if (isWeekendDay) {
      baseOrders = seededRandom(seed, 3, 8); // Lower weekend orders
    } else {
      switch (dayOfWeek) {
        case 1: // Monday
          baseOrders = seededRandom(seed, 8, 15);
          break;
        case 2: // Tuesday
          baseOrders = seededRandom(seed, 10, 18);
          break;
        case 3: // Wednesday
          baseOrders = seededRandom(seed, 12, 20);
          break;
        case 4: // Thursday
          baseOrders = seededRandom(seed, 10, 18);
          break;
        case 5: // Friday
          baseOrders = seededRandom(seed, 8, 15);
          break;
        default:
          baseOrders = seededRandom(seed, 5, 12);
      }
    }

    // Monthly pattern adjustments
    const monthAdjustment = dayOfMonth <= 5 || dayOfMonth >= 25 ? 1.2 : 1;

    // Seasonal adjustments
    let seasonalMultiplier = 1;
    if (month === 11 || month === 0) {
      // December and January
      seasonalMultiplier = 1.3; // Holiday season
    } else if (month >= 5 && month <= 7) {
      // Summer months
      seasonalMultiplier = 1.15; // Summer increase
    }

    const orders = Math.round(
      baseOrders * monthAdjustment * seasonalMultiplier
    );

    // Calculate revenue with product mix variation
    const avgOrderValue = seededRandom(seed + 1, 80, 200);
    const revenue = orders * avgOrderValue;

    // Determine activity level
    let activityLevel: "low" | "medium" | "high" = "low";
    if (orders > 15) {
      activityLevel = "high";
    } else if (orders > 8) {
      activityLevel = "medium";
    }

    // Calculate status breakdowns
    const completedRatio = seededRandom(seed + 2, 55, 65) / 100;
    const processingRatio = seededRandom(seed + 3, 20, 30) / 100;

    const completed = Math.round(orders * completedRatio);
    const processing = Math.round(orders * processingRatio);
    const pending = orders - completed - processing;

    // Generate hourly data for each day
    const hourlyData = generateHourlyData(date, orders);

    return {
      date,
      orders,
      revenue,
      activityLevel,
      completed,
      processing,
      pending,
      hourlyData,
    };
  });
};

const OrderActivity: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [periodFilter, setPeriodFilter] = useState<
    "Today" | "This Week" | "This Month"
  >("This Week");
  const [allOrderData, setAllOrderData] = useState<OrderData[]>([]);
  const [visibleOrderData, setVisibleOrderData] = useState<OrderData[]>([]);
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);

  // Get locale for date formatting
  const currentLocale = i18n.language === "fr" ? fr : enUS;

  // Generate initial data for a longer period (6 months back and 6 months forward)
  useEffect(() => {
    const today = new Date();
    const sixMonthsAgo = subMonths(today, 6);
    const sixMonthsAhead = addMonths(today, 6);
    const initialData = generateMockData(sixMonthsAgo, sixMonthsAhead);
    setAllOrderData(initialData);
  }, []);

  // Filter visible data based on period and current date
  useEffect(() => {
    if (allOrderData.length === 0) return;

    let periodStart: Date;
    let periodEnd: Date;

    switch (periodFilter) {
      case "Today": {
        // Set the time to start of day for accurate comparison
        periodStart = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          0,
          0,
          0
        );
        periodEnd = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59
        );
        break;
      }
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

    const filteredData = allOrderData
      .filter((data) => {
        const dataDate = new Date(
          data.date.getFullYear(),
          data.date.getMonth(),
          data.date.getDate()
        );
        return dataDate >= periodStart && dataDate <= periodEnd;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

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
        return format(currentDate, "MMMM d, yyyy", { locale: currentLocale });
      case "This Week": {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
        return `${format(weekStart, "M/d/yyyy", {
          locale: currentLocale,
        })} - ${format(weekEnd, "M/d/yyyy", { locale: currentLocale })}`;
      }
      case "This Month":
        return format(currentDate, "MMMM yyyy", { locale: currentLocale });
      default:
        return "";
    }
  };

  // Render function for Today view
  const renderTodayView = () => {
    if (!selectedDayData?.hourlyData) return null;

    const hourlyData = selectedDayData.hourlyData;

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {hourlyData.map((hourData, index) => {
            const isSelected =
              selectedHour &&
              isSameDay(hourData.hour, selectedHour) &&
              hourData.hour.getHours() === selectedHour.getHours();

            let activityLevel: "high" | "medium" | "low" = "low";
            if (hourData.orders > 10) {
              activityLevel = "high";
            } else if (hourData.orders > 5) {
              activityLevel = "medium";
            }

            const activityColors: Record<"high" | "medium" | "low", string> = {
              high: "bg-orange-100 text-orange-700",
              medium: "bg-yellow-100 text-yellow-700",
              low: "bg-green-100 text-green-700",
            };

            return (
              <div
                key={index}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-600 bg-blue-50/50"
                    : "bg-white hover:shadow-md hover:border-gray-300"
                }`}
                onClick={() => setSelectedHour(hourData.hour)}
              >
                <div className="text-center mb-2">
                  <div className="text-lg font-semibold text-gray-900">
                    {format(hourData.hour, "h:00 a", { locale: currentLocale })}
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <div className="font-medium text-gray-900">
                    {hourData.orders}{" "}
                    {t("dashboard.OrderActivity.orders").toLowerCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    ${hourData.revenue.toFixed(2)}
                  </div>
                </div>

                <div
                  className={`text-center text-xs font-medium mt-2 py-1 rounded-full ${activityColors[activityLevel]}`}
                >
                  {t(`dashboard.OrderActivity.activity_level.${activityLevel}`)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hour Details */}
        {selectedHour && hourlyData && (
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("dashboard.OrderActivity.orders_for")}{" "}
              {format(selectedHour, "EEEE, MMMM d, yyyy", {
                locale: currentLocale,
              })}{" "}
              {t("dashboard.OrderActivity.at")}{" "}
              {format(selectedHour, "h:00 a", { locale: currentLocale })}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500">
                  {t("dashboard.OrderActivity.orders_this_hour")}
                </div>
                <div className="text-3xl font-bold text-gray-900 mt-1">
                  {hourlyData.find(
                    (h) => h.hour.getHours() === selectedHour.getHours()
                  )?.orders || 0}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500">
                  {t("dashboard.OrderActivity.revenue_this_hour")}
                </div>
                <div className="text-3xl font-bold text-gray-900 mt-1">
                  $
                  {hourlyData
                    .find((h) => h.hour.getHours() === selectedHour.getHours())
                    ?.revenue.toFixed(2) || "0.00"}
                </div>
              </div>
            </div>

            <h4 className="text-md font-semibold text-gray-900 mb-4">
              {t("dashboard.OrderActivity.order_status_breakdown")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["completed", "processing", "pending"].map((status) => {
                const hourData = hourlyData.find(
                  (h) => h.hour.getHours() === selectedHour.getHours()
                );
                const value = hourData
                  ? hourData[status as keyof typeof hourData]
                  : 0;
                const total = hourData?.orders || 1;
                const percentage = Math.round((Number(value) / total) * 100);

                const statusColors = {
                  completed: {
                    dot: "bg-green-500",
                    bg: "bg-green-100",
                    text: "text-green-700",
                  },
                  processing: {
                    dot: "bg-blue-500",
                    bg: "bg-blue-100",
                    text: "text-blue-700",
                  },
                  pending: {
                    dot: "bg-yellow-500",
                    bg: "bg-yellow-100",
                    text: "text-yellow-700",
                  },
                };

                const colors =
                  statusColors[status as keyof typeof statusColors];

                return (
                  <div
                    key={status}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${colors.dot}`}
                        ></div>
                        <div className="text-sm font-medium capitalize">
                          {t(`dashboard.OrderActivity.${status}`)}
                        </div>
                      </div>
                      <div className={`text-2xl font-bold ${colors.text}`}>
                        {value.toString()}
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text} inline-block`}
                    >
                      {percentage}
                      {t("dashboard.OrderActivity.of_total")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t("dashboard.OrderActivity.title")}
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
              {t(
                `dashboard.OrderActivity.${period
                  .toLowerCase()
                  .replace(" ", "_")}`
              )}
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
                  ? t("dashboard.OrderActivity.daily")
                  : periodFilter === "This Week"
                  ? t("dashboard.OrderActivity.weekly")
                  : t("dashboard.OrderActivity.monthly")}{" "}
                {t("dashboard.OrderActivity.orders")}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{getPeriodLabel()}</p>
              {isSameDay(currentDate, new Date()) && (
                <p className="text-sm text-blue-600 mt-1">
                  {t("dashboard.OrderActivity.today")}
                </p>
              )}
            </div>

            <button
              onClick={() => navigate("next")}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Conditional rendering based on period */}
          {periodFilter === "Today" ? (
            renderTodayView()
          ) : (
            <>
              <div
                className={`grid ${
                  periodFilter === "This Week"
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
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
                          {format(day.date, "EEE", { locale: currentLocale })}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {format(day.date, "d", { locale: currentLocale })}
                        </div>
                      </div>

                      <div className="text-center space-y-1">
                        <div className="text-sm text-gray-600">
                          {day.orders}{" "}
                          {t("dashboard.OrderActivity.orders").toLowerCase()}
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
                        {t(
                          `dashboard.OrderActivity.activity_level.${day.activityLevel}`
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Day Details - Only show for non-Today views */}
              {selectedDayData && (
                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {format(selectedDayData.date, "EEEE, MMMM d, yyyy", {
                      locale: currentLocale,
                    })}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500">
                        {t("dashboard.OrderActivity.total_orders")}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mt-1">
                        {selectedDayData.orders}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500">
                        {t("dashboard.OrderActivity.total_revenue")}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mt-1">
                        ${selectedDayData.revenue.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-md font-semibold text-gray-900 mb-4">
                    {t("dashboard.OrderActivity.order_status_breakdown")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div className="text-sm font-medium">
                            {t("dashboard.OrderActivity.completed")}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {selectedDayData.completed}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedDayData.orders > 0
                          ? Math.round(
                              (selectedDayData.completed /
                                selectedDayData.orders) *
                                100
                            )
                          : 0}
                        {t("dashboard.OrderActivity.of_total")}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <div className="text-sm font-medium">
                            {t("dashboard.OrderActivity.processing")}
                          </div>
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
                        {t("dashboard.OrderActivity.of_total")}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="text-sm font-medium">
                            {t("dashboard.OrderActivity.pending")}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">
                          {selectedDayData.pending}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedDayData.orders > 0
                          ? Math.round(
                              (selectedDayData.pending /
                                selectedDayData.orders) *
                                100
                            )
                          : 0}
                        {t("dashboard.OrderActivity.of_total")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 lg:border-l lg:pl-6">
          <div className="bg-gray-50 rounded-lg p-4 md:p-6">
            <div className="text-sm text-gray-500 mb-2">{getPeriodLabel()}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {t("dashboard.OrderActivity.total_orders")}
                </h3>
                <div className="text-3xl font-bold text-gray-900">
                  {periodTotal.orders}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {t("dashboard.OrderActivity.total_revenue")}
                </h3>
                <div className="text-3xl font-bold text-gray-900">
                  ${periodTotal.revenue.toFixed(2)}
                </div>
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-900 mb-4">
              {t("dashboard.OrderActivity.order_status")}
            </h3>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">
                      {t("dashboard.OrderActivity.completed")}
                    </span>
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
                    <span className="text-sm font-medium">
                      {t("dashboard.OrderActivity.processing")}
                    </span>
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
                    <span className="text-sm font-medium">
                      {t("dashboard.OrderActivity.pending")}
                    </span>
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
