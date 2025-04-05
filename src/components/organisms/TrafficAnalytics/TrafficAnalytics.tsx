import React from "react";
import { Users, Globe } from "lucide-react";
import DoughnutChartCard from "../../molecules/DoughnutChartCard/DoughnutChartCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./TrafficAnalytics.css";

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  trend: number;
}

interface VisitorLocation {
  id: string;
  country: string;
  city: string;
  visitors: number;
  latitude: number;
  longitude: number;
}

interface TrafficAnalyticsProps {
  trafficSources: TrafficSource[];
  visitorLocations: VisitorLocation[];
}

// Define custom marker icon
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="w-3 h-3 bg-indigo-500 rounded-full relative">
          <div class="absolute w-5 h-5 bg-indigo-500 rounded-full -top-1 -left-1 animate-ping opacity-75"></div>
         </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const TrafficAnalytics: React.FC<TrafficAnalyticsProps> = ({
  trafficSources,
  visitorLocations,
}) => {
  const chartColors = [
    "rgba(79, 70, 229, 0.8)",
    "rgba(16, 185, 129, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(239, 68, 68, 0.8)",
    "rgba(99, 102, 241, 0.8)",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Traffic Sources Chart */}
      <DoughnutChartCard
        title="Traffic Sources"
        subtitle="Where your visitors come from"
        data={trafficSources.map((source) => ({
          label: source.source,
          value: source.visitors,
          percentage: source.percentage,
          trend: source.trend,
        }))}
        colors={chartColors}
        icon={Users}
      />

      {/* Visitor Map */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Live Visitors</h3>
            <p className="text-sm text-gray-500 mt-1">
              Current visitor locations worldwide
            </p>
          </div>
          <div className="bg-indigo-50 p-2 rounded-lg">
            <Globe className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <div className="mb-6">
          <MapContainer
            center={[20, 0]}
            zoom={1}
            scrollWheelZoom={false}
            className="map-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visitorLocations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <div className="text-sm font-medium">
                    {location.city}, {location.country}
                    <div className="text-xs mt-1">
                      {location.visitors} active visitors
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="space-y-3">
          {visitorLocations
            .sort((a, b) => b.visitors - a.visitors)
            .slice(0, 5)
            .map((location) => (
              <div
                key={location.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {location.city}, {location.country}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {location.visitors} active
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalytics;
