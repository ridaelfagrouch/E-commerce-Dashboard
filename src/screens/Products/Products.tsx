import React, { useState } from "react";
import StatCard from "../../components/molecules/StatCard/StatCard";
import {
  ShoppingBag,
  TrendingUp,
  Percent,
  Tag,
  Plus,
  Filter,
  ChevronDown,
} from "lucide-react";
import Pagination from "../../components/molecules/Pagination/Pagination";
import SearchInput from "../../components/atoms/SearchInput/SearchInput";
import Button from "../../components/atoms/Button/Button";
import ProductFilterGroup from "../../components/molecules/ProductFilterGroup/ProductFilterGroup";
import ProductsTable, {
  Product,
} from "../../components/organisms/ProductsTable/ProductsTable";

const filterOptions = [
  { id: "all", label: "All Categories" },
  { id: "electronics", label: "Electronics" },
  { id: "fitness", label: "Fitness" },
  { id: "food & beverage", label: "Food & Beverage" },
  { id: "accessories", label: "Accessories" },
  { id: "lifestyle", label: "Lifestyle" },
];

export const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalProducts = 1286;
  const productsPerPage = 8;

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button variant="primary" leftIcon={<Plus size={16} />}>
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-medium">Product Filters</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <SearchInput
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              variant="secondary"
              leftIcon={<Filter size={16} />}
              rightIcon={<ChevronDown size={14} />}
            >
              Filters
            </Button>
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <ProductFilterGroup
            options={filterOptions}
            activeFilter={category}
            onFilterChange={setCategory}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ProductsTable
          products={sortedProducts}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
        <div className="border-t">
          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={productsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
