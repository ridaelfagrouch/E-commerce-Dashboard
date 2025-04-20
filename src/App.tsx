import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainLayout from "./templates/MainLayout/MainLayout";
import Dashboard from "./screens/Dashboard/Dashboard";
import Orders from "./screens/Orders/Orders";
import Products from "./screens/Products/Products";
import Customers from "./screens/Customers/Customers";
import Analytics from "./screens/Analytics/Analytics";
import Settings from "./screens/Settings/Settings";
import Login from "./screens/Login/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
