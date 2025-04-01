import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./templates/MainLayout/MainLayout";
import Dashboard from "./screens/Dashboard/Dashboard";

const Orders = () => <div>Orders Page</div>;
const Products = () => <div>Products Page</div>;
const Customers = () => <div>Customers Page</div>;
const Analytics = () => <div>Analytics Page</div>;
const Settings = () => <div>Settings Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <MainLayout>
              <Orders />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/customers"
          element={
            <MainLayout>
              <Customers />
            </MainLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <MainLayout>
              <Analytics />
            </MainLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
