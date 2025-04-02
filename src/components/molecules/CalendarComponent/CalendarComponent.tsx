import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { Tooltip } from "react-tooltip";

// Types
interface CalendarEvent {
  date: Date;
  count: number;
  type: "low" | "medium" | "high";
}

interface CalendarComponentProps {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  period: "day" | "week" | "month";
  initialDate?: Date;
  showOrderCount?: boolean;
  colorMapping?: {
    low: string;
    medium: string;
    high: string;
  };
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events = [],
  onDateSelect,
  period,
  initialDate = new Date(),
  showOrderCount = true,
  colorMapping = {
    low: "green",
    medium: "yellow",
    high: "red",
  },
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(initialDate));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewStartDate, setViewStartDate] = useState<Date | null>(null);
  const [viewEndDate, setViewEndDate] = useState<Date | null>(null);

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

  // Get event count for a specific date
  const getEventCount = (date: Date): number => {
    const event = events.find(
      (e) =>
        e.date.getDate() === date.getDate() &&
        e.date.getMonth() === date.getMonth() &&
        e.date.getFullYear() === date.getFullYear()
    );

    return event ? event.count : 0;
  };

  // Helper function to get color based on activity level
  const getActivityColor = (
    level: "low" | "medium" | "high" | null
  ): string => {
    if (!level) return "transparent";

    // Background colors
    const bgColors = {
      low: `bg-${colorMapping.low}-100`,
      medium: `bg-${colorMapping.medium}-100`,
      high: `bg-${colorMapping.high}-100`,
    };

    return bgColors[level];
  };

  // Helper function to get bar color based on activity level
  const getBarColor = (level: "low" | "medium" | "high" | null): string => {
    if (!level) return "bg-gray-200";

    // Bar colors
    const barColors = {
      low: `bg-${colorMapping.low}-400`,
      medium: `bg-${colorMapping.medium}-400`,
      high: `bg-${colorMapping.high}-400`,
    };

    return barColors[level];
  };

  // Handler for date selection
  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newSelectedDate);
    if (onDateSelect) {
      onDateSelect(newSelectedDate);
    }
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

  // Legend component for color explanation
  const ActivityLegend = () => (
    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mt-4">
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full bg-${colorMapping.low}-400 mr-1`}
        ></div>
        <span>Low</span>
      </div>
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full bg-${colorMapping.medium}-400 mr-1`}
        ></div>
        <span>Medium</span>
      </div>
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full bg-${colorMapping.high}-400 mr-1`}
        ></div>
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
  if (period === "day") {
    const hourlyActivity = getHourlyActivity();

    return (
      <div className="h-64 overflow-y-auto">
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
        <div className="grid grid-cols-4 gap-2">
          {hourlyActivity.map((hour) => (
            <div
              key={hour.hour}
              className={`rounded-lg p-2 text-center ${getActivityColor(
                hour.activityLevel
              )} hover:opacity-80 transition-opacity cursor-pointer`}
              onClick={() =>
                console.log(`Hour ${hour.hour}: ${hour.orderCount} orders`)
              }
              data-tooltip-id={`hour-tooltip-${hour.hour}`}
            >
              <p className="text-xs font-medium">{hour.label}</p>
              <div
                className={`mt-1 w-full h-1 rounded-full ${getBarColor(
                  hour.activityLevel
                )}`}
              ></div>
              {showOrderCount && (
                <p className="mt-1 text-xs">{hour.orderCount} orders</p>
              )}
              <Tooltip id={`hour-tooltip-${hour.hour}`}>
                {hour.label}: {hour.orderCount} orders ({hour.activityLevel}{" "}
                activity)
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (period === "week") {
    const weekActivity = getWeekActivityMap();

    return (
      <div className="h-64 overflow-y-auto">
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
        <div className="flex justify-between space-x-2">
          {weekActivity.map((day) => (
            <div
              key={day.date.toString()}
              className={`flex-1 rounded-lg border border-gray-200 p-2 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedDate &&
                day.date.getDate() === selectedDate.getDate() &&
                day.date.getMonth() === selectedDate.getMonth() &&
                day.date.getFullYear() === selectedDate.getFullYear()
                  ? "border-indigo-400 ring-1 ring-indigo-400"
                  : ""
              }`}
              onClick={() => handleDateClick(day.day)}
              data-tooltip-id={`day-tooltip-${day.day}`}
            >
              <p className="text-xs text-gray-500">{day.dayName}</p>
              <p
                className={`font-medium ${
                  day.date.getDate() === new Date().getDate() &&
                  day.date.getMonth() === new Date().getMonth() &&
                  day.date.getFullYear() === new Date().getFullYear()
                    ? "text-indigo-600"
                    : ""
                }`}
              >
                {day.day}
              </p>
              <div
                className={`mt-2 w-full h-2 rounded-full ${getBarColor(
                  day.activityLevel
                )}`}
              ></div>
              {showOrderCount && (
                <p className="mt-1 text-xs font-medium">
                  {day.orderCount} orders
                </p>
              )}
              <Tooltip id={`day-tooltip-${day.day}`}>
                {day.date.toLocaleDateString()}: {day.orderCount} orders (
                {day.activityLevel} activity)
              </Tooltip>
            </div>
          ))}
        </div>

        {selectedDate && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">
              Selected: {selectedDate.toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500">
              Click on a day to see detailed order information
            </p>
          </div>
        )}
      </div>
    );
  }

  // Month view (default)
  const monthDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    monthDays.push(null); // Empty cells before the first day
  }

  for (let day = 1; day <= daysInMonth; day++) {
    monthDays.push(day);
  }

  return (
    <div className="h-64 overflow-y-auto">
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
            {new Date(currentYear, currentMonth).toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
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
          // Determine if this day is today
          const isToday =
            day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();

          // Determine if this day is selected
          const isSelected =
            selectedDate &&
            day === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear();

          // Get activity level
          const activityLevel = day !== null ? getActivityLevel(day) : null;

          return (
            <div
              key={index}
              className={`
                aspect-square flex flex-col items-center justify-center text-sm p-1 relative
                ${day === null ? "" : "cursor-pointer hover:bg-gray-100"}
                ${isToday ? "bg-indigo-100" : ""}
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
                      className={`mt-1 w-2 h-2 rounded-full ${getBarColor(
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
  );
};

export default CalendarComponent;
