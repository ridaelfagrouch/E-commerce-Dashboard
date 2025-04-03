import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Tooltip } from "react-tooltip";

// Types
interface CalendarEvent {
  date: Date;
  count: number;
  type: "low" | "medium" | "high";
}

interface ActivityColors {
  low: {
    bg: string;
    bar: string;
    dot: string;
  };
  medium: {
    bg: string;
    bar: string;
    dot: string;
  };
  high: {
    bg: string;
    bar: string;
    dot: string;
  };
}

interface WeekActivityDay {
  date: Date;
  dayName: string;
  day: number;
  activityLevel: "low" | "medium" | "high";
  orderCount: number;
}

interface HourlyActivity {
  hour: number;
  label: string;
  activityLevel: "low" | "medium" | "high";
  orderCount: number;
}

interface CalendarComponentProps {
  events?: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  period: "day" | "week" | "month";
  initialDate?: Date;
  showOrderCount?: boolean;
  selectedDate?: Date | null;
}

const activityColors: ActivityColors = {
  low: {
    bg: "bg-green-50",
    bar: "bg-green-400",
    dot: "bg-green-400",
  },
  medium: {
    bg: "bg-yellow-50",
    bar: "bg-yellow-400",
    dot: "bg-yellow-400",
  },
  high: {
    bg: "bg-red-50",
    bar: "bg-red-400",
    dot: "bg-red-400",
  },
};

// Helper functions for activity colors
const getActivityColor = (level: "low" | "medium" | "high" | null): string => {
  if (!level) return "";
  return activityColors[level].bg;
};

const getBarColor = (level: "low" | "medium" | "high" | null): string => {
  if (!level) return "bg-gray-200";
  return activityColors[level].bar;
};

// Add a shared card style component
const ActivityCard = ({
  label,
  value,
  activityLevel,
  orderCount,
  isSelected = false,
  isToday = false,
  onClick,
  tooltipId,
  tooltipContent,
}: {
  label: string;
  value: string | number;
  activityLevel: "low" | "medium" | "high" | null;
  orderCount: number;
  isSelected?: boolean;
  isToday?: boolean;
  onClick: () => void;
  tooltipId: string;
  tooltipContent: string;
}) => (
  <div
    className={`
      w-36 shrink-0 rounded-lg border p-3 text-center cursor-pointer
      transition-all duration-200 ease-in-out
      hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
      ${
        isSelected
          ? "border-indigo-400 ring-2 ring-indigo-400 shadow-md"
          : "border-gray-200 hover:border-indigo-200"
      }
      ${getActivityColor(activityLevel)}
    `}
    onClick={onClick}
    data-tooltip-id={tooltipId}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className={`font-medium text-lg ${isToday ? "text-indigo-600" : ""}`}>
      {value}
    </p>
    <div className="mt-2 w-full h-2 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${getBarColor(
          activityLevel
        )}`}
        style={{ width: `${(orderCount / 20) * 100}%` }}
      />
    </div>
    <p className="mt-2 text-xs font-medium text-gray-700">
      {orderCount} orders
    </p>
    <Tooltip id={tooltipId} className="z-50" delayShow={200} delayHide={100}>
      {tooltipContent}
    </Tooltip>
  </div>
);

// Add this new component after ActivityCard
const ScrollableContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = React.useState(false);
  const [showRightScroll, setShowRightScroll] = React.useState(false);

  const checkScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    setShowLeftScroll(container.scrollLeft > 0);
    setShowRightScroll(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    checkScroll(); // Initial check

    return () => container.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="relative">
      {showLeftScroll && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      )}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>
      {showRightScroll && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      )}
    </div>
  );
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events = [],
  onDateSelect,
  period,
  initialDate = new Date(),
  selectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(initialDate));
  const [viewStartDate, setViewStartDate] = useState<Date | null>(null);
  const [viewEndDate, setViewEndDate] = useState<Date | null>(null);
  // Update state types
  const [weekActivityData, setWeekActivityData] = useState<WeekActivityDay[]>(
    []
  );
  const [hourlyActivityData, setHourlyActivityData] = useState<
    HourlyActivity[]
  >([]);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // First day of month and how many days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Calculate view range when period or current date changes
  useEffect(() => {
    if (period === "week") {
      const today = new Date(currentDate);
      const dayOfWeek = today.getDay();
      const firstDay = new Date(today);
      firstDay.setDate(today.getDate() - dayOfWeek);

      const lastDay = new Date(firstDay);
      lastDay.setDate(firstDay.getDate() + 6);

      setViewStartDate(firstDay);
      setViewEndDate(lastDay);
    } else if (period === "month") {
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);

      setViewStartDate(firstDay);
      setViewEndDate(lastDay);
    } else {
      // For day view
      setViewStartDate(new Date(currentDate));
      setViewEndDate(new Date(currentDate));
    }
  }, [period, currentDate, currentMonth, currentYear]);

  // Update activity data when period or current date changes
  useEffect(() => {
    if (period === "week") {
      setWeekActivityData(getWeekActivityMap());
    } else if (period === "day") {
      setHourlyActivityData(getHourlyActivity());
    }
  }, [period, currentDate]);

  // Navigation functions
  const prevPeriod = () => {
    if (period === "day") {
      const prevDay = new Date(currentDate);
      prevDay.setDate(prevDay.getDate() - 1);
      setCurrentDate(prevDay);
    } else if (period === "week") {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setCurrentDate(prevWeek);
    } else {
      // Month view
      setCurrentDate(new Date(currentYear, currentMonth - 1));
    }
  };

  const nextPeriod = () => {
    if (period === "day") {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCurrentDate(nextDay);
    } else if (period === "week") {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentDate(nextWeek);
    } else {
      // Month view
      setCurrentDate(new Date(currentYear, currentMonth + 1));
    }
  };

  // Reset to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Helper function to get activity level for a date
  const getActivityLevel = (day: number): "low" | "medium" | "high" | null => {
    const dateToCheck = new Date(currentYear, currentMonth, day);

    const event = events.find(
      (e) =>
        e.date.getDate() === dateToCheck.getDate() &&
        e.date.getMonth() === dateToCheck.getMonth() &&
        e.date.getFullYear() === dateToCheck.getFullYear()
    );

    return event ? event.type : null;
  };

  // Helper function to get dot color based on activity level
  const getDotColor = (level: "low" | "medium" | "high" | null): string => {
    if (!level) return "bg-gray-200";
    return activityColors[level].dot;
  };

  // Handler for date selection
  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newSelectedDate);
  };

  // Get the day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get activity map for the week view
  const getWeekActivityMap = () => {
    if (!viewStartDate || !viewEndDate) return [];

    const weekDays = [];
    const firstDayOfWeek = new Date(viewStartDate);

    // Create an array for each day of the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);

      // Find existing event or generate random data for demo
      const event = events.find(
        (e) =>
          e.date.getDate() === day.getDate() &&
          e.date.getMonth() === day.getMonth() &&
          e.date.getFullYear() === day.getFullYear()
      );

      const activityLevel =
        event?.type ||
        (["low", "medium", "high"][Math.floor(Math.random() * 3)] as
          | "low"
          | "medium"
          | "high");

      const orderCount =
        event?.count ||
        (activityLevel === "low"
          ? Math.floor(Math.random() * 5)
          : activityLevel === "medium"
          ? Math.floor(Math.random() * 10) + 5
          : Math.floor(Math.random() * 15) + 15);

      weekDays.push({
        date: day,
        dayName: dayNames[day.getDay()],
        day: day.getDate(),
        activityLevel,
        orderCount,
      });
    }

    return weekDays;
  };

  // Activity heatmap for today
  const getHourlyActivity = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const ampm = i < 12 ? "AM" : "PM";
      const hourLabel = `${hour} ${ampm}`;

      // Random activity level
      const activityLevel = ["low", "medium", "high"][
        Math.floor(Math.random() * 3)
      ] as "low" | "medium" | "high";

      // Random order count based on activity level
      const orderCount =
        activityLevel === "low"
          ? Math.floor(Math.random() * 3)
          : activityLevel === "medium"
          ? Math.floor(Math.random() * 5) + 3
          : Math.floor(Math.random() * 7) + 8;

      hours.push({
        hour: i,
        label: hourLabel,
        activityLevel,
        orderCount,
      });
    }
    return hours;
  };

  // Format date range for display
  const formatDateRange = (): string => {
    if (!viewStartDate || !viewEndDate) return "";

    if (period === "day") {
      return viewStartDate.toLocaleDateString();
    } else {
      return `${viewStartDate.toLocaleDateString()} - ${viewEndDate.toLocaleDateString()}`;
    }
  };

  // Activity legend component
  const ActivityLegend = () => (
    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mt-4">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
        <span>Low</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
        <span>Medium</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
        <span>High</span>
      </div>
      <div className="flex items-center">
        <Info className="w-3 h-3 mr-1" data-tooltip-id="calendar-info" />
        <span>Activity</span>
      </div>
      <Tooltip id="calendar-info" place="top">
        Activity level represents order volume or traffic
      </Tooltip>
    </div>
  );

  // Render different views based on period
  if (period === "week") {
    return (
      <div className="flex flex-col h-64">
        <div className="flex-none">
          <ActivityLegend />
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevPeriod}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="font-medium">This Week's Order Activity</h3>
              <p className="text-sm text-gray-500">{formatDateRange()}</p>
              <button
                onClick={goToToday}
                className="text-xs text-indigo-600 hover:underline mt-1"
              >
                Today
              </button>
            </div>
            <button
              onClick={nextPeriod}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Next week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 pb-4">
          <ScrollableContainer>
            <div className="flex gap-3 px-1">
              {weekActivityData.map((day) => {
                const isToday =
                  day.date.getDate() === new Date().getDate() &&
                  day.date.getMonth() === new Date().getMonth() &&
                  day.date.getFullYear() === new Date().getFullYear();

                const isSelected = Boolean(
                  selectedDate &&
                    day.date.getDate() === selectedDate.getDate() &&
                    day.date.getMonth() === selectedDate.getMonth() &&
                    day.date.getFullYear() === selectedDate.getFullYear()
                );

                return (
                  <ActivityCard
                    key={day.date.toString()}
                    label={day.dayName}
                    value={day.day}
                    activityLevel={day.activityLevel}
                    orderCount={day.orderCount}
                    isSelected={isSelected}
                    isToday={isToday}
                    onClick={() => handleDateClick(day.day)}
                    tooltipId={`day-tooltip-${day.day}`}
                    tooltipContent={`${day.date.toLocaleDateString()}: ${
                      day.orderCount
                    } orders (${day.activityLevel} activity)`}
                  />
                );
              })}
            </div>
          </ScrollableContainer>

          {selectedDate && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg animate-fade-in">
              <p className="text-sm font-medium">
                Selected: {selectedDate.toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Click on a day to see detailed order information
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (period === "day") {
    return (
      <div className="flex flex-col h-64">
        <div className="flex-none">
          <ActivityLegend />
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevPeriod}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Previous day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="font-medium">Today's Order Activity</h3>
              <p className="text-sm text-gray-500">
                {currentDate.toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={nextPeriod}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Next day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 pb-4">
          <ScrollableContainer>
            <div className="flex gap-3 px-1">
              {hourlyActivityData.map((hour) => (
                <ActivityCard
                  key={hour.hour}
                  label="Time"
                  value={hour.label}
                  activityLevel={hour.activityLevel}
                  orderCount={hour.orderCount}
                  onClick={() =>
                    console.log(`Hour ${hour.hour}: ${hour.orderCount} orders`)
                  }
                  tooltipId={`hour-tooltip-${hour.hour}`}
                  tooltipContent={`${hour.label}: ${hour.orderCount} orders (${hour.activityLevel} activity)`}
                />
              ))}
            </div>
          </ScrollableContainer>
        </div>
      </div>
    );
  }

  // Month view
  const monthDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    monthDays.push(null); // Empty cells before the first day
  }

  for (let day = 1; day <= daysInMonth; day++) {
    monthDays.push(day);
  }

  return (
    <div className="flex flex-col h-64">
      <div className="flex-none">
        <ActivityLegend />
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevPeriod}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h3 className="font-medium">
              {new Date(currentYear, currentMonth).toLocaleDateString(
                "default",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </h3>
            <button
              onClick={goToToday}
              className="text-xs text-indigo-600 hover:underline mt-1"
            >
              Today
            </button>
          </div>
          <button
            onClick={nextPeriod}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((name) => (
            <div
              key={name}
              className="text-center text-xs font-medium text-gray-500 py-1"
            >
              {name}
            </div>
          ))}

          {monthDays.map((day, index) => {
            const isToday =
              day === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear();

            const isSelected =
              selectedDate &&
              day === selectedDate.getDate() &&
              currentMonth === selectedDate.getMonth() &&
              currentYear === selectedDate.getFullYear();

            const activityLevel = day !== null ? getActivityLevel(day) : null;

            return (
              <div
                key={index}
                className={`
                  aspect-square flex flex-col items-center justify-center text-sm p-1 relative
                  ${day === null ? "" : "cursor-pointer hover:bg-gray-50"}
                  ${isToday ? "bg-indigo-50" : ""}
                  ${isSelected ? "ring-2 ring-indigo-500 rounded-full" : ""}
                `}
                onClick={() => day !== null && handleDateClick(day)}
                data-tooltip-id={day !== null ? `month-day-${day}` : undefined}
              >
                {day !== null && (
                  <>
                    <span
                      className={
                        isToday
                          ? "text-indigo-800 font-medium"
                          : isSelected
                          ? "text-indigo-600"
                          : ""
                      }
                    >
                      {day}
                    </span>
                    {activityLevel && (
                      <div
                        className={`mt-1 w-2 h-2 rounded-full ${getDotColor(
                          activityLevel
                        )}`}
                      />
                    )}
                    <Tooltip id={`month-day-${day}`}>
                      {new Date(
                        currentYear,
                        currentMonth,
                        day
                      ).toLocaleDateString()}
                      : {activityLevel || "No"} activity
                    </Tooltip>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {selectedDate && (
          <div className="mt-4 p-2 bg-gray-50 text-center rounded-lg text-sm">
            <span className="font-medium">Selected: </span>
            <span>{selectedDate.toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
