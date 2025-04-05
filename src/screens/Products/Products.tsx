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

const actionButtons = [
  {
    label: "Add Product",
    variant: "primary" as const,
    icon: <Plus size={16} />,
  },
];

const statsCards = [
  {
    id: "1",
    title: "Total Products",
    value: "186",
    icon: <ShoppingBag size={24} />,
    trend: {
      value: 12.5,
      isPositive: true,
      text: "since last month",
    },
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "2",
    title: "Total Sales",
    value: "1,432",
    icon: <TrendingUp size={24} />,
    trend: {
      value: 8.3,
      isPositive: true,
      text: "since last month",
    },
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "3",
    title: "Average Price",
    value: "$68.99",
    icon: <Tag size={24} />,
    trend: {
      value: 5.2,
      isPositive: true,
      text: "since last month",
    },
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "4",
    title: "Low Stock Items",
    value: "12",
    icon: <Percent size={24} />,
    trend: {
      value: 3.5,
      isPositive: false,
      text: "since last month",
    },
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const initialProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 99.99,
    stock: 38,
    sales: 124,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "PRD-002",
    name: "Ultra HD Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 15,
    sales: 98,
    status: "Low Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "PRD-003",
    name: "Premium Yoga Mat",
    category: "Fitness",
    price: 49.99,
    stock: 52,
    sales: 87,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "PRD-004",
    name: "Organic Coffee Beans",
    category: "Food & Beverage",
    price: 24.99,
    stock: 125,
    sales: 76,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "PRD-005",
    name: "Leather Wallet",
    category: "Accessories",
    price: 59.99,
    stock: 28,
    sales: 65,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "PRD-006",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 3,
    sales: 62,
    status: "Low Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "PRD-007",
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    price: 34.99,
    stock: 0,
    sales: 58,
    status: "Out of Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "PRD-008",
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 29.99,
    stock: 42,
    sales: 53,
    status: "Active",
    imageUrl:
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
];

export const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("sales");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const totalProducts = 1286;
  const productsPerPage = 8;

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
    <div className="space-y-6 mb-6 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-3">
          {actionButtons.map((button, index) => (
            <Button key={index} variant={button.variant} leftIcon={button.icon}>
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
          />
        ))}
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
