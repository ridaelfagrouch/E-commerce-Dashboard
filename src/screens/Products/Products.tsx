import React, { useState } from "react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import {
  ShoppingBag,
  TrendingUp,
  Percent,
  Tag,
  Plus,
  Filter,
  Edit,
  Eye,
  ChevronDown,
  Image,
} from "lucide-react";
import Pagination from "../../components/molecules/Pagination/Pagination";
import SearchInput from "../../components/atoms/SearchInput/SearchInput";

// Types
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  status: "Active" | "Low Stock" | "Out of Stock";
};

export const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalProducts = 1286;
  const ProductsPerPage = 8;

  const [products, setProducts] = useState<Product[]>([
    {
      id: "PRD-001",
      name: "Wireless Earbuds Pro",
      category: "Electronics",
      price: 99.99,
      stock: 38,
      sales: 124,
      status: "Active",
    },
    {
      id: "PRD-002",
      name: "Ultra HD Smart Watch",
      category: "Electronics",
      price: 199.99,
      stock: 15,
      sales: 98,
      status: "Low Stock",
    },
    {
      id: "PRD-003",
      name: "Premium Yoga Mat",
      category: "Fitness",
      price: 49.99,
      stock: 52,
      sales: 87,
      status: "Active",
    },
    {
      id: "PRD-004",
      name: "Organic Coffee Beans",
      category: "Food & Beverage",
      price: 24.99,
      stock: 125,
      sales: 76,
      status: "Active",
    },
    {
      id: "PRD-005",
      name: "Leather Wallet",
      category: "Accessories",
      price: 59.99,
      stock: 28,
      sales: 65,
      status: "Active",
    },
    {
      id: "PRD-006",
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 79.99,
      stock: 3,
      sales: 62,
      status: "Low Stock",
    },
    {
      id: "PRD-007",
      name: "Stainless Steel Water Bottle",
      category: "Lifestyle",
      price: 34.99,
      stock: 0,
      sales: 58,
      status: "Out of Stock",
    },
    {
      id: "PRD-008",
      name: "Wireless Charging Pad",
      category: "Electronics",
      price: 29.99,
      stock: 42,
      sales: 53,
      status: "Active",
    },
  ]);

  const [category, setCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("sales");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredProducts = products
    .filter((product) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    })
    .filter((product) => {
      if (category === "all") return true;
      return product.category.toLowerCase() === category.toLowerCase();
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const fieldA = a[sortField as keyof Product];
    const fieldB = b[sortField as keyof Product];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    } else {
      return sortDirection === "asc"
        ? Number(fieldA) - Number(fieldB)
        : Number(fieldB) - Number(fieldA);
    }
  });

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value="186"
          icon={<ShoppingBag className="text-indigo-600" size={24} />}
          trend={{
            value: 12.5,
            isPositive: true,
            text: "since last month",
          }}
        />
        <StatCard
          title="Total Sales"
          value="1,432"
          icon={<TrendingUp className="text-green-600" size={24} />}
          trend={{
            value: 8.3,
            isPositive: true,
            text: "since last month",
          }}
        />
        <StatCard
          title="Average Price"
          value="$68.99"
          icon={<Tag className="text-blue-600" size={24} />}
          trend={{
            value: 5.2,
            isPositive: true,
            text: "since last month",
          }}
        />
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={<Percent className="text-yellow-600" size={24} />}
          trend={{
            value: 3.5,
            isPositive: false,
            text: "since last month",
          }}
        />
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Product Filters</h2>
          <div className="flex gap-2">
            <SearchInput
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="bg-gray-100 px-3 py-2 rounded-md flex items-center gap-1">
              <Filter size={16} />
              Filters
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
        <div className="p-4 flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${
              category === "all"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100"
            }`}
            onClick={() => setCategory("all")}
          >
            All Categories
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              category === "electronics"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100"
            }`}
            onClick={() => setCategory("electronics")}
          >
            Electronics
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              category === "fitness"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100"
            }`}
            onClick={() => setCategory("fitness")}
          >
            Fitness
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              category === "food & beverage"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100"
            }`}
            onClick={() => setCategory("food & beverage")}
          >
            Food & Beverage
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              category === "accessories"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100"
            }`}
            onClick={() => setCategory("accessories")}
          >
            Accessories
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              category === "lifestyle"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100"
            }`}
            onClick={() => setCategory("lifestyle")}
          >
            Lifestyle
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <Image size={64} className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{product.id}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
                <h3 className="font-medium mt-1">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded text-sm flex items-center justify-center gap-1">
                    <Eye size={14} /> View
                  </button>
                  <button className="flex-1 bg-gray-50 text-gray-600 px-2 py-1 rounded text-sm flex items-center justify-center gap-1">
                    <Edit size={14} /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalProducts}
          itemsPerPage={ProductsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Products;
